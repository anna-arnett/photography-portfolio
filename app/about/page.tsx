
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Meet Your Chicago Photographer",

  description:
    "Meet Anna Arnett, a Chicago portrait and editorial photographer. Learn about my photography style and relaxed, collaborative approach to photo sessions.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "website",
    siteName: "Anna Arnett Photography",
    locale: "en_US",
    url: "/about",
    title: "Meet Anna | Anna Arnett Photography",
    description:
      "Get to know your Chicago photographer and learn what a photography session with Anna looks like.",
    images: [
      {
        url: "/photos/senior_headshot4.JPG",
        alt: "Anna Arnett, Chicago photographer",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* TOP */}
      <section className={styles.top}>
        <div className={styles.topRule}>
          <span>ABOUT</span>
          <span>ANNA ARNETT</span>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.introHeading}>
          <h1>
            About your
            <br />
            photographer
          </h1>
        </div>

        <div className={styles.introContent}>
          <figure className={styles.introPhoto}>
            <img
              src="/photos/senior_headshot4.JPG"
              alt="Anna Arnett"
            />
          </figure>

          <div className={styles.introText}>
            <p>
              Photography has been my favorite hobby for several years now,
              and now that I graduated college, I finally feel like I have the
              time to take it more seriously. I&apos;m a Notre Dame grad, a
              Wisconsin native, and the oldest of 4 sisters (who I make model
              for me a lot, as you can tell).
            </p>

            <p>
              I also have a day job if you can believe it! My degree is in
              Computer Science and I&apos;m currently a full-time Software
              Engineer (I even made this website to prove it).
            </p>

            <p>
              Besides working and taking pictures, I really love reading (big
              sci-fi fan), watching sitcoms with my roommate, any time spent at
              the lakefront or on a patio, and random side quests all over
              Chicago. I am also trying really hard to learn how to make latte
              art with my espresso machine and would welcome any tips you may
              have.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.process}>
        <div className={styles.processHeader}>
          <div>
            <h2>My process:</h2>
          </div>
        </div>

        <div className={styles.steps}>
          <article className={styles.step}>
            <span>01</span>

            <h3>Before</h3>

            <p>
              We&apos;ll talk through the location and the vibe you&apos;re
              looking for; send any inspiration pics/mood boards/ideas
              you have!
            </p>
          </article>

          <article className={styles.step}>
            <span>02</span>

            <h3>During</h3>

            <p>
              Feel free to bring as many outfit changes as you want to,
              and friends + family are
              also super welcome. You can look at the pictures as we go so
              you know how they&apos;re turning out. And don&apos;t worry about
              feeling awkward in front of the camera or knowing how to pose,
              I&apos;ll guide you through everything!
            </p>
          </article>

          <article className={styles.step}>
            <span>03</span>

            <h3>After</h3>

            <p>
              Basically, the photos are yours! I&apos;ll send you a curated collection of
              edited images within two weeks of your shoot that you can download, post,
              and print.
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaWrap}>
        <div className={styles.cta}>
          <Link href="/inquire">
            LET&apos;S SHOOT! →
          </Link>
        </div>
      </section>
    </main>
  );
}
