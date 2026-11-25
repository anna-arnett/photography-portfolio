"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import styles from "./page.module.css";

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type TurnstileAPI = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme: "light" | "dark" | "auto";
      size: "flexible";
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ) => string;

  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

function getTurnstile(): TurnstileAPI | undefined {
  return (
    window as Window & {
      turnstile?: TurnstileAPI;
    }
  ).turnstile;
}

const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function InquiryForm() {
  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [feedback, setFeedback] = useState("");

  const [turnstileToken, setTurnstileToken] =
    useState("");

  const [verificationError, setVerificationError] =
    useState("");

  const submittingRef = useRef(false);

  const widgetContainerRef =
    useRef<HTMLDivElement>(null);

  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    const turnstile = getTurnstile();

    if (
      !turnstile ||
      !widgetContainerRef.current ||
      widgetIdRef.current !== null ||
      !SITE_KEY
    ) {
      return;
    }

    try {
      widgetIdRef.current = turnstile.render(
        widgetContainerRef.current,
        {
          sitekey: SITE_KEY,
          theme: "dark",
          size: "flexible",
          action: "inquiry",

          callback: (token) => {
            setTurnstileToken(token);
            setVerificationError("");
          },

          "expired-callback": () => {
            setTurnstileToken("");
          },

          "error-callback": () => {
            setTurnstileToken("");

            setVerificationError(
              "Verification could not be completed. Please try again or refresh the page."
            );
          },
        }
      );
    } catch {
      setVerificationError(
        "Verification could not be loaded. Please refresh the page."
      );
    }
  }, []);

  useEffect(() => {
    renderWidget();

    return () => {
      const turnstile = getTurnstile();

      if (turnstile && widgetIdRef.current !== null) {
        turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  function resetVerification() {
    setTurnstileToken("");

    const turnstile = getTurnstile();

    if (turnstile && widgetIdRef.current !== null) {
      try {
        turnstile.reset(widgetIdRef.current);
      } catch {
        setVerificationError(
          "Please refresh the page to verify again."
        );
      }
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submittingRef.current) return;

    if (!turnstileToken) {
      setStatus("error");

      setFeedback(
        "Please complete the security verification before submitting."
      );

      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      date: String(formData.get("date") ?? ""),
      location: String(formData.get("location") ?? ""),
      message: String(formData.get("message") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      website: String(formData.get("website") ?? ""),
      turnstileToken,
    };

    submittingRef.current = true;
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Your inquiry could not be sent."
        );
      }

      form.reset();

      setStatus("success");

      setFeedback(
        "Thank you for reaching out! Your inquiry has been sent. I'll be in touch soon to chat about your session."
      );
    } catch (error) {
      setStatus("error");

      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      submittingRef.current = false;

      // Turnstile tokens cannot be reused.
      resetVerification();
    }
  }

  const isSubmitting = status === "loading";

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
        onError={() =>
          setVerificationError(
            "Security verification could not be loaded. Please refresh the page."
          )
        }
      />

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
      >
        <fieldset
          disabled={isSubmitting}
          className={styles.formFields}
        >
          <div className={styles.twoColumns}>
            <label>
              <span>NAME *</span>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </label>

            <label>
              <span>EMAIL *</span>

              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
          </div>

          <label>
            <span>WHAT ARE YOU INTERESTED IN? *</span>

            <select
              name="service"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Choose one
              </option>

              <option value="senior">
                Senior / graduation portraits
              </option>

              <option value="portrait">
                Portraits
              </option>

              <option value="headshot">
                Headshots
              </option>

              <option value="creative">
                Creative shoot
              </option>

              <option value="couples">
                Couples
              </option>

              <option value="event">
                Event
              </option>

              <option value="other">
                Something else
              </option>
            </select>
          </label>

          <div className={styles.twoColumns}>
            <label>
              <span>IDEAL DATE</span>

              <input
                type="text"
                name="date"
                placeholder="Exact or approximate"
                maxLength={150}
              />
            </label>

            <label>
              <span>LOCATION</span>

              <input
                type="text"
                name="location"
                placeholder="Chicago, neighborhood, etc."
                maxLength={200}
              />
            </label>
          </div>

          <label>
            <span>TELL ME ABOUT IT</span>

            <textarea
              name="message"
              rows={7}
              placeholder="What would your dream photos look like?"
              maxLength={3000}
            />
          </label>

          <label>
            <span>GENERAL BUDGET?</span>

            <input
              type="text"
              name="budget"
              placeholder="Hoping to keep it under X amount..."
              maxLength={150}
            />
          </label>

          {/* Honeypot */}
          <div
            className={styles.honeypot}
            aria-hidden="true"
          >
            <label>
              Leave this field empty

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          {/* Cloudflare security verification */}
          <div>
            <div
              ref={widgetContainerRef}
              style={{
                width: "100%",
                maxWidth: "320px",
                minHeight: "65px",
              }}
            />

            {!SITE_KEY && (
              <p className={styles.formNote}>
                Security verification is unavailable.
              </p>
            )}

            {verificationError && (
              <div
                className={`${styles.formFeedback} ${styles.formError}`}
                role="alert"
              >
                <p>{verificationError}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
          >
            {isSubmitting
              ? "SENDING..."
              : "SEND INQUIRY →"}
          </button>
        </fieldset>

        {status === "success" && (
          <div
            className={`${styles.formFeedback} ${styles.formSuccess}`}
            role="status"
          >
            <p>{feedback}</p>
          </div>
        )}

        {status === "error" && (
          <div
            className={`${styles.formFeedback} ${styles.formError}`}
            role="alert"
          >
            <p>{feedback}</p>
          </div>
        )}

        <p className={styles.formNote}>
          I&apos;ll get back to you as soon as I can to
          chat about your session and availability!
        </p>
        <p className={styles.privacyNote}>
            By submitting an inquiry, you acknowledge my{" "}
            <a href="/privacy">privacy policy</a>.
        </p>
      </form>
    </>
  );
}