import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { portraitShoots } from "./shoots";

export default function PortraitsPage() {
  const portraitSessions = portraitShoots.filter(
    (shoot) =>
      !shoot.type.toLowerCase().includes("headshot")
  );

  const headshotSessions = portraitShoots.filter(
    (shoot) =>
      shoot.type.toLowerCase().includes("headshot")
  );

  const heroA = portraitSessions[0];
  const heroB = portraitSessions[2];

  const featured = portraitSessions.slice(0, 6);

  return (
    <main className={styles.page}>
      {/* TOP RULE */}
      <section className={styles.top}>
        <div className={styles.topRule}>
          <Link href="/work">← SELECTED WORK</Link>

          <span>PORTRAITS + HEADSHOTS</span>

          <span>CHICAGO, IL</span>
        </div>
      </section>

      {/* SPLIT HERO */}
      {heroA && heroB && (
        <section className={styles.hero}>
          <Link
            href={`/work/portraits/${heroA.slug}`}
            className={styles.heroHalf}
          >
            <Image
              src={heroA.cover}
              alt={`${heroA.name} portrait`}
              fill
              priority
              sizes="50vw"
            />
          </Link>

          <Link
            href={`/work/portraits/${heroB.slug}`}
            className={styles.heroHalf}
          >
            <Image
              src={heroB.cover}
              alt={`${heroB.name} portrait`}
              fill
              priority
              sizes="50vw"
            />
          </Link>

          <div className={styles.heroWash} />

          <div className={styles.heroTitle}>
            <h1>Portraits</h1>
          </div>
        </section>
      )}

      {/* COLLECTION INTRO */}
      <section className={styles.collectionIntro}>
        <div className={styles.collectionHeading}>

          <div className={styles.indexList}>
            {featured.map((shoot, index) => (
              <Link
                href={`/work/portraits/${shoot.slug}`}
                key={shoot.slug}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{shoot.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL COLLAGE */}
      <section className={styles.portfolio}>
        {featured.map((shoot, index) => (
          <Link
            href={`/work/portraits/${shoot.slug}`}
            key={shoot.slug}
            className={`${styles.project} ${
              styles[`project${index + 1}`]
            }`}
          >
            <figure className={styles.projectImage}>
              <img
                src={shoot.cover}
                alt={`${shoot.name} portrait`}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />

              <div className={styles.hoverWash} />

              <span className={styles.viewGallery}>
                VIEW GALLERY
              </span>
            </figure>

            <div className={styles.projectCaption}>
              <div className={styles.projectTitle}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{shoot.name}</h3>
              </div>

              <p>
                {shoot.type} · {shoot.location} ·{" "}
                {shoot.date}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* HEADSHOTS */}
      {headshotSessions.length > 0 && (
        <section className={styles.headshots}>

          <div className={styles.headshotHeading}>
            <div>

              <h2>Headshots</h2>
            </div>
          </div>

          <div className={styles.headshotViewport}>
            <div className={styles.headshotStrip}>
              {headshotSessions.map((shoot, index) => (
                <figure
                  className={styles.headshotFrame}
                  key={shoot.slug}
                >
                  <div className={styles.headshotImage}>
                    <img
                      src={shoot.cover}
                      alt={`${shoot.name} headshot`}
                      loading="lazy"
                      decoding="async"
                    />

                    <span className={styles.headshotNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <figcaption>
                    <span>{shoot.name}</span>

                    <span>
                      {shoot.location} · {shoot.date}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <p className={styles.headshotHint}>
            SCROLL TO VIEW →
          </p>
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>

        <Link href="/inquire">GET IN TOUCH →</Link>
      </section>
    </main>
  );
}