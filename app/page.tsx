import PhotographyStructuredData from "./PhotographyStructuredData";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute:
      "Chicago Portrait & Headshot Photographer | Anna Arnett Photography",
  },

  description:
    "Affordable portrait, senior, graduation, headshot and creative photography in Chicago. Warm, nostalgic images with an editorial approach.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Anna Arnett Photography",
    url: "/",
    title:
      "Chicago Portrait & Headshot Photographer | Anna Arnett Photography",
    description:
      "Warm, nostalgic portraits with an editorial approach. Chicago photography for seniors, headshots, couples and creative projects.",
    images: [
      {
        url: "/photos/converse.jpg",
        alt: "Waves breaking around Converse shoes in warm evening light",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className={styles.home}>
      <PhotographyStructuredData />
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/photos/converse.jpg"
            alt="Waves breaking around Converse shoes in warm evening light"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.heroCopy}>
          <div className={styles.heroLogo}>
            <Image
              src="/photos/coffeelogo.png"
              alt=""
              width={80}
              height={80}
              className={styles.coffeeLogo}
            />
          </div>

          <h1>Anna Arnett</h1>

          <p className={styles.heroKicker}>
            Chicago · Portrait + Editorial Photography
          </p>
        </div>

        <a href="#hello" className={styles.explore}>
          EXPLORE ↓
        </a>
      </section>

      {/* EDITORIAL INTRO */}
      <section className={styles.introSpread} id="hello">
        <div className={styles.introRule}>
          <span>ANNA ARNETT PHOTOGRAPHY</span>
          <span>CHICAGO, IL</span>
        </div>

        <figure className={styles.lydiaPhoto}>
          <Image
            src="/photos/lydiasenior.JPG"
            alt="Portrait surrounded by tall grasses and yellow flowers"
            fill
            sizes="(max-width: 800px) 85vw, 30vw"
          />
        </figure>

        <div className={styles.introCopy}>
          <p className={styles.italicIntro}>My work</p>

          <h2>
            Warm, nostalgic portraits for the photo album
          </h2>

          <p className={styles.bodyCopy}>
            I love to take photos! In my work, I take a
            more editorial approach to traditional
            portraits, incorporating unique light,
            shadows, and setting into each shot.
            <br />
            <br />
            My goal in every shoot is to bring a vision
            to life. Whether that&apos;s a straightforward
            headshot or a creative artistic project,
            I&apos;d be so excited to help you plan out
            the concept you&apos;re looking for.
          </p>

          <Link href="/work" className={styles.textLink}>
            VIEW SELECTED WORK →
          </Link>
        </div>

        <figure className={styles.shadowPhoto}>
          <Image
            src="/photos/mary2.jpg"
            alt="Creative portrait using patterned light and shadow"
            fill
            sizes="(max-width: 800px) 65vw, 22vw"
          />
        </figure>
      </section>

      {/* PORTRAIT REEL */}
      <section className={styles.portraitReel}>
        <div className={styles.portraitReelHeader}>
          <p>PORTRAITS / HEADSHOTS / +MORE</p>
          <Link href="/work">SEE MORE →</Link>
        </div>

        <div className={styles.portraitGrid}>
          <figure className={`${styles.reelPhoto} ${styles.reelOne}`}>
            <Image
              src="/photos/place-mirror.jpg"
              alt="Portrait in warm natural light"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelTwo}`}>
            <Image
              src="/photos/ava2.jpg"
              alt="Outdoor portrait"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelThree}`}>
            <Image
              src="/photos/sam.jpg"
              alt="Creative portrait"
              fill
              sizes="(max-width: 800px) 100vw, 25vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelFour}`}>
            <Image
              src="/photos/shadow.jpg"
              alt="Portrait in soft natural light"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelFive}`}>
            <Image
              src="/photos/jakeball.jpg"
              alt="Candid laughing portrait"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.aboutFeature}>
        <span className={styles.aboutMonogram} aria-hidden="true">
          AA
        </span>

        <div className={styles.aboutFeatureVisual}>
          <figure className={styles.selfPortrait}>
            <Image
              src="/photos/me.jpg"
              alt="Anna Arnett"
              fill
              sizes="(max-width: 800px) 45vw, 18vw"
            />
          </figure>
        </div>

        <div className={styles.aboutFeatureCopy}>
          <p className={styles.lightKicker}>ABOUT ME</p>

          <h2>Hi, I&apos;m Anna!</h2>

          <p>
            I graduated college in May, and I live in
            Chicago now! I&apos;m still building up my
            portfolio, so I&apos;m super willing to
            accommodate all different kinds of
            photoshoots. Click below to learn more about
            who I am and what the process looks like for
            shooting with me!
          </p>

          <Link href="/about" className={styles.lightLink}>
            MORE ABOUT ME →
          </Link>
        </div>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.closingMedia}>
          <Image
            src="/photos/tree.jpg"
            alt="Flowering branches against a blue sky"
            fill
            sizes="100vw"
          />
        </div>

        <div className={styles.closingOverlay} />

        <div className={styles.closingCopy}>
          <h2>Let&apos;s work together!</h2>

          <Link href="/inquire" className={styles.lightLink}>
            GET IN TOUCH →
          </Link>
        </div>
      </section>
    </main>
  );
}
