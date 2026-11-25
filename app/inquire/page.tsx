
import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "./InquiryForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing & Booking",

  description:
    "Affordable Chicago photography: headshots from $50, portraits and couples sessions from $100, and senior portraits from $150. Inquire about your session.",

  alternates: {
    canonical: "/inquire",
  },

  openGraph: {
    type: "website",
    siteName: "Anna Arnett Photography",
    locale: "en_US",
    url: "/inquire",
    title: "Photography Sessions & Pricing | Anna Arnett Photography",
    description:
      "Explore affordable Chicago photography sessions, including headshots, senior portraits, couples and creative shoots. Let's plan your session.",
    images: [
      {
        url: "/photos/lydiasenior.JPG",
        alt: "Warm outdoor senior portrait",
      },
    ],
  },
};

export default function InquirePage() {
  return (
    <main className={styles.page}>
      {/* TOP */}
      <section className={styles.top}>
        <div className={styles.topRule}>
          <span>INQUIRE</span>
          <span>ANNA ARNETT PHOTOGRAPHY</span>
          <span>CHICAGO, IL</span>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.introLeft}>
          <h1>Inquire</h1>
        </div>

        <div className={styles.introRight}>
          <p>
            The sessions below are just an example of
            what a shoot could look like, I&apos;m happy
            to adjust or do something completely
            different, just reach out!
          </p>

          <p>
            I&apos;m based in Chicago and available for
            select travel.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.services}>
        <div className={styles.servicesRule}>
          <span>RATES</span>
          <span>01—04</span>
        </div>

        <div className={styles.serviceGrid}>
          <div className={styles.service}>
            <span>01</span>

            <div>
              <h2>Senior/Grad Portraits · $150</h2>

              <p>
                60-75 min<br/>Unlimited outfits<br/>
                Unlimited locations<br/>30-45 edited
                photos
              </p>
            </div>

          </div>

          <div className={styles.service}>
            <span>02</span>

            <div>
              <h2>Headshots · $50</h2>

              <p>
                20 min<br/>Unlimited outfits<br/>10 edited
                photos
              </p>
            </div>

          </div>

          <div className={styles.service}>
            <span>03</span>

            <div>
              <h2>Portraits · $100</h2>

              <p>
                60 min<br/>Unlimited outfits<br/>20-30
                edited photos
              </p>
            </div>

          </div>

          <div className={styles.service}>
            <span>04</span>

            <div>
              <h2>Couples · $100</h2>

              <p>
                60 min<br/>Unlimited outfits<br/>20-30
                edited photos
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section className={styles.inquiry}>
        <div className={styles.inquiryInfo}>
          <div>
            <p className={styles.lightKicker}>
              START HERE
            </p>

            <h2>Tell me what your vision is!</h2>

            <p className={styles.inquiryCopy}>
              No need to have all the details, a simple
              overview is good enough and we can figure
              out the rest.
            </p>
          </div>

          <div className={styles.goodToInclude} />
        </div>

        <InquiryForm />
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.closingRule}>
          <span>ANNA ARNETT PHOTOGRAPHY</span>

          <span>CHICAGO + SELECT TRAVEL</span>
        </div>

        <p>
          portraits / seniors / headshots / creative work
        </p>
      </section>
    </main>
  );
}
