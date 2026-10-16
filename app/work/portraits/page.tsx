import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { portraitShoots } from "./shoots";

export default function PortraitsPage() {
  const heroA = portraitShoots[0];
  const heroB = portraitShoots[1];
  const featured = portraitShoots.slice(0, 6);

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
            <span className={styles.heroSmall}>
              ANNA ARNETT / PEOPLE / VOL. 01
            </span>

            <h1>
              The Portrait
              <br />
              <em>Index</em>
            </h1>

            <span className={styles.heroSub}>
              portraits · headshots · people
            </span>
          </div>
        </section>
      )}

      {/* COLLECTION INTRO */}
      <section className={styles.collectionIntro}>
        <div className={styles.collectionRule}>
          <span>FEATURED GALLERIES</span>
          <span>
            {String(featured.length).padStart(2, "0")} COLLECTIONS
          </span>
        </div>

        <div className={styles.collectionHeading}>
          <div>
            <p className={styles.eyebrow}>PORTRAIT STUDIES</p>

            <h2>
              Faces, light,
              <br />
              <em>and the places around them.</em>
            </h2>
          </div>

          <div className={styles.indexList}>
            {featured.map((shoot, index) => (
              <Link
                href={`/work/portraits/${shoot.slug}`}
                key={shoot.slug}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
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
                {shoot.type} · {shoot.location} · {shoot.date}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <p>PORTRAITS / HEADSHOTS / SOMETHING ELSE</p>

        <h2>
          Have an idea?
          <br />
          <em>Let&apos;s photograph it.</em>
        </h2>

        <Link href="/inquire">
          GET IN TOUCH →
        </Link>
      </section>
    </main>
  );
}