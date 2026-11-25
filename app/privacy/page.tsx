import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Anna Arnett Photography",
  description:
    "Learn how Anna Arnett Photography collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.intro}>

          <h1>Privacy Policy</h1>

          <p className={styles.updated}>
            Last updated November 24, 2026
          </p>
        </header>

        <div className={styles.content}>
          <p>
            Your privacy matters. This policy explains
            how Anna Arnett Photography collects and
            uses information when you visit this website
            or inquire about a photography session.
          </p>

          <section>
            <h2>Information I collect</h2>

            <p>
              When you submit an inquiry, you may
              provide your name, email address,
              preferred session date, location,
              budget, and details about your
              photography needs.
            </p>

            <p>
              My website and its service providers
              may also process limited technical
              information, such as browser information,
              IP addresses, and request details,
              to operate and protect the website.
            </p>
          </section>

          <section>
            <h2>How I use your information</h2>

            <p>
              Information you provide may be used to:
            </p>

            <ul>
              <li>Respond to photography inquiries.</li>
              <li>Discuss availability and pricing.</li>
              <li>Plan and coordinate sessions.</li>
              <li>
                Deliver photography services and
                communicate with clients.
              </li>
              <li>
                Maintain relevant business records.
              </li>
              <li>
                Protect the website from spam and abuse.
              </li>
            </ul>

            <p>
              I do not sell your personal information
              or use inquiry submissions for unsolicited
              marketing.
            </p>
          </section>

          <section>
            <h2>Third-party services</h2>

            <p>
              This website relies on third-party
              providers to deliver email, host the
              website, and maintain security.
            </p>

            <ul>
              <li>
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </a>
                {" — "}
                delivers inquiry emails.
              </li>

              <li>
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cloudflare
                </a>
                {" — "}
                helps prevent spam and automated abuse.
              </li>

              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google
                </a>
                {" — "}
                provides email services used for
                client communication.
              </li>
            </ul>

            <p>
              These providers process information
              according to their respective privacy
              policies.
            </p>
          </section>

          <section>
            <h2>Website analytics</h2>

            <p>
              This website may use privacy-focused
              analytics to understand website traffic
              and performance. These insights help
              improve the website and understand
              which pages visitors find useful.
            </p>

            <p>
              I do not use advertising trackers or
              analytics designed to build individual
              advertising profiles.
            </p>
          </section>

          <section>
            <h2>Photography and image permissions</h2>

            <p>
              Permission to publish client photographs
              for portfolio, website, or social media
              purposes is handled separately from
              photography inquiries and bookings.
            </p>

            <p>
              Submitting an inquiry does not grant
              permission to publish your photographs.
            </p>
          </section>

          <section>
            <h2>Information retention</h2>

            <p>
              Personal information is retained for
              as long as reasonably necessary to
              respond to inquiries, provide agreed
              services, maintain business records,
              and meet applicable legal obligations.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>

            <p>
              You may contact me to request access
              to, correction of, or deletion of
              personal information you have provided,
              subject to applicable legal and
              recordkeeping requirements.
            </p>
          </section>

          <section>
            <h2>Contact</h2>

            <p>
              If you have questions about this policy
              or how your information is handled,
              please reach out through my{" "}
              <Link href="/inquire">
                inquiry page
              </Link>.
            </p>
          </section>

          <div className={styles.closing}>
            <p>
              Anna Arnett Photography
            </p>

            <span>
              Chicago · Available for select travel
            </span>
          </div>
        </div>

        <Link href="/" className={styles.back}>
          ← BACK TO HOME
        </Link>
      </div>
    </main>
  );
}