"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import styles from "./page.module.css";

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export default function InquiryForm() {
  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [feedback, setFeedback] = useState("");
  const submittingRef = useRef(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submittingRef.current) return;

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
    }
  }

  const isSubmitting = status === "loading";

  return (
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

        {/* Honeypot for basic spam protection */}
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

        <button
          type="submit"
          disabled={isSubmitting}
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
    </form>
  );
}