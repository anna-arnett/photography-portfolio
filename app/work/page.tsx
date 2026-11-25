
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Chicago Photography Portfolio",

  description:
    "Explore senior portraits, graduation photos, headshots, creative portraits and editorial photography by Chicago photographer Anna Arnett.",

  alternates: {
    canonical: "/work",
  },

  openGraph: {
    type: "website",
    siteName: "Anna Arnett Photography",
    locale: "en_US",
    url: "/work",
    title: "Selected Work | Anna Arnett Photography",
    description:
      "A collection of portraits, senior photography, headshots and experimental editorial work by Chicago photographer Anna Arnett.",
    images: [
      {
        url: "/photos/marlokate2.JPG",
        alt: "Portrait in warm field light",
      },
    ],
  },
};

const archivePhotos = [
  {
    src: "/photos/place-room.jpg",
    alt: "Warm creative portrait",
    href: "/work/portraits",
  },
  {
    src: "/photos/marlokate2.JPG",
    alt: "Couples portrait in warm field light",
    href: "/work/portraits",
  },
  {
    src: "/photos/strike2.JPG",
    alt: "Creative portrait",
    href: "/work/creative",
  },
  {
    src: "/photos/mary.jpg",
    alt: "Warm outdoor portrait",
    href: "/work/seniors",
  },
  {
    src: "/photos/teresa.jpg",
    alt: "Warm fall portrait",
    href: "/work/seniors",
  },
  {
    src: "/photos/motion-laugh.JPG",
    alt: "Portrait in soft natural light",
    href: "/work/portraits",
  },
  {
    src: "/photos/motion-dance.jpg",
    alt: "Portrait of a dancer in the snow",
    href: "/work/portraits",
  },
  {
    src: "/photos/shadow.jpg",
    alt: "Creative portrait with unique shadow",
    href: "/work/creative",
  },
  {
    src: "/photos/cooljake.jpg",
    alt: "Candid laughing portrait",
    href: "/work/seniors",
  },
  {
    src: "/photos/lydia-stair.jpg",
    alt: "Portrait of a girl walking up stairs",
    href: "/work/seniors",
  },
  {
    src: "/photos/regan.JPG",
    alt: "Rich, colorful senior photo",
    href: "/work/seniors",
  },
  {
    src: "/photos/ava3.jpg",
    alt: "Senior portrait in natural surroundings",
    href: "/work/seniors",
  },
];

export default function Work() {
  return (
    <main className={styles.work}>
      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.topRule}>
          <span>SELECTED WORK</span>
          <span>ANNA ARNETT</span>
        </div>

        <div className={styles.introContent}>
          <div className={styles.introTitle}>
            <h1>Portfolio</h1>
          </div>
        </div>
      </section>

      {/* CATEGORY NAVIGATION */}
      <section className={styles.categories}>
        <Link
          href="/work/seniors"
          className={`${styles.categoryCard} ${styles.olive}`}
        >
          <span className={styles.categoryNumber}>01</span>

          <div>
            <h2>Seniors</h2>
          </div>

          <span className={styles.categoryLink}>VIEW →</span>
        </Link>

        <Link
          href="/work/portraits"
          className={`${styles.categoryCard} ${styles.blue}`}
        >
          <span className={styles.categoryNumber}>02</span>

          <div>
            <h2>
              Portraits
              <br />+ Headshots
            </h2>
          </div>

          <span className={styles.categoryLink}>VIEW →</span>
        </Link>

        <Link
          href="/work/creative"
          className={`${styles.categoryCard} ${styles.creamCard}`}
        >
          <span className={styles.categoryNumber}>03</span>

          <div>
            <h2>
              Misc.
              <br />
              Shoots
            </h2>
          </div>

          <span className={styles.categoryLink}>VIEW →</span>
        </Link>

        <Link
          href="/inquire"
          className={`${styles.categoryCard} ${styles.gold}`}
        >
          <span className={styles.categoryNumber}>04</span>

          <div>
            <p>ALSO AVAILABLE FOR</p>
            <h2>
              Select
              <br />
              Events + Brands
            </h2>
          </div>

          <span className={styles.categoryLink}>INQUIRE →</span>
        </Link>
      </section>

      {/* ARCHIVE */}
      <section className={styles.archive}>
        <div className={styles.archiveHeader}>
          <div>
            <span>THE ARCHIVE</span>
            <span className={styles.archiveCount}>
              {String(archivePhotos.length).padStart(2, "0")} PHOTOGRAPHS
            </span>
          </div>

          <p>click a photograph to explore its collection</p>
        </div>

        <div className={styles.photoGrid}>
          {archivePhotos.map((photo, index) => (
            <Link
              href={photo.href}
              className={styles.photo}
              key={`${photo.src}-${index}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
              />

              <span className={styles.photoNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.closing}>
        <p className={styles.kicker}>LET&apos;S SHOOT!</p>

        <Link href="/inquire" className={styles.inquireLink}>
          INQUIRE →
        </Link>
      </section>
    </main>
  );
}
