import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const archivePhotos = [
  {
    src: "/photos/lydiasenior.JPG",
    alt: "Senior portrait among wildflowers",
    href: "/work/seniors",
  },
  {
    src: "/photos/regan.jpg",
    alt: "Portrait in warm field light",
    href: "/work/seniors",
  },
  {
    src: "/photos/shadow.jpg",
    alt: "Creative portrait with patterned shadow",
    href: "/work/creative",
  },
  {
    src: "/photos/mary.jpg",
    alt: "Warm outdoor portrait",
    href: "/work/portraits",
  },
  {
    src: "/photos/converse.jpg",
    alt: "Waves splashing around Converse shoes",
    href: "/work/creative",
  },
  {
    src: "/photos/ava.jpg",
    alt: "Portrait in soft natural light",
    href: "/work/portraits",
  },
  {
    src: "/photos/traincool.jpg",
    alt: "Chicago train framed by foliage and architecture",
    href: "/work/creative",
  },
  {
    src: "/photos/sam.jpg",
    alt: "Creative portrait in natural light",
    href: "/work/portraits",
  },
  {
    src: "/photos/jakeball.jpg",
    alt: "Candid laughing portrait",
    href: "/work/portraits",
  },
  {
    src: "/photos/strike2.jpg",
    alt: "Black and white figure in the water",
    href: "/work/creative",
  },
  {
    src: "/photos/motion-dance.jpg",
    alt: "Experimental portrait in snow",
    href: "/work/creative",
  },
  {
    src: "/photos/lydiasenior.JPG",
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
          <span>ANNA ARNETT PHOTOGRAPHY · CHICAGO</span>
        </div>

        <div className={styles.introContent}>
          <div className={styles.introTitle}>
            <p className={styles.kicker}>THE ARCHIVE</p>

            <h1>
              text,
              <br />
              <em>text.</em>
            </h1>
          </div>

          <div className={styles.introSide}>
            <p>
              text.
            </p>

            <p className={styles.services}>
              Seniors · Portraits + Headshots · Creative Shoots · Select Events
            </p>
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
            <p>PORTRAITS</p>
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
            <p>PEOPLE</p>
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
            <p>EXPERIMENTS</p>
            <h2>
              Creative
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
              Events
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
        <p className={styles.kicker}>HAVE SOMETHING IN MIND?</p>

        <h2>
          Let&apos;s make something
          <br />
          worth keeping.
        </h2>

        <Link href="/inquire" className={styles.inquireLink}>
          INQUIRE →
        </Link>
      </section>
    </main>
  );
}