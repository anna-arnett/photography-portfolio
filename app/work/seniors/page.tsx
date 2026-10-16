import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { seniorShoots } from "./shoots";

export default function SeniorsPage() {
  return (
    <main className={styles.page}>
      {/* YEARBOOK HEADER */}
      <section className={styles.intro}>
        <div className={styles.topRule}>
          <Link href="/work">← SELECTED WORK</Link>

          <span>ANNA ARNETT PHOTOGRAPHY</span>

          <span>VOL. 01</span>
        </div>

        <div className={styles.masthead}>
          <p className={styles.overline}>
            SENIOR PORTRAITS · CHICAGO
          </p>

          <h1>The Yearbook</h1>

          <p className={styles.subtitle}>
            portraits from the in-between
          </p>
        </div>

        <div className={styles.introBottom}>
          <p>
            A growing collection of people at the end of one thing
            and the beginning of another.
          </p>

          <div className={styles.index}>
            <span>ISSUE</span>
            <strong>01</strong>
          </div>
        </div>
      </section>

      {/* SHOOT INDEX */}
      <section className={styles.yearbook}>
        <div className={styles.sectionRule}>
          <span>THE CLASS</span>
          <span>{String(seniorShoots.length).padStart(2, "0")} SHOOTS</span>
        </div>

        <div className={styles.grid}>
          {seniorShoots.map((shoot, index) => (
            <Link
              href={`/work/seniors/${shoot.slug}`}
              className={styles.entry}
              key={shoot.slug}
            >
              <figure className={styles.cover}>
                <Image
                  src={shoot.cover}
                  alt={`${shoot.name} senior portrait`}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />

                <div className={styles.overlay}>
                  <div className={styles.overlayTop}>
                    <span>
                      {String(index + 1).padStart(3, "0")}
                    </span>

                    <span>THE YEARBOOK</span>
                  </div>

                  <div className={styles.overlayBottom}>
                    <div>
                      <h2>{shoot.name}</h2>

                      <p>{shoot.date}</p>
                      <p>{shoot.location}</p>
                    </div>

                    <span className={styles.view}>
                      VIEW SHOOT →
                    </span>
                  </div>
                </div>
              </figure>

              <div className={styles.caption}>
                <span>
                  {String(index + 1).padStart(3, "0")}
                </span>

                <h2>{shoot.name}</h2>

                <span>{shoot.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LITTLE YEARBOOK STRIP */}
      <section className={styles.details}>
        <div>
          <span>LOCATION</span>
          <p>Chicago + wherever the idea takes us</p>
        </div>

        <div>
          <span>FOR</span>
          <p>Seniors who want more than one stiff pose</p>
        </div>

        <div>
          <span>ENERGY</span>
          <p>Warm light, movement, personality, good clothes</p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <p>WANT A PAGE IN THE YEARBOOK?</p>

        <h2>
          Your turn.
        </h2>

        <Link href="/inquire">
          INQUIRE ABOUT SENIOR PHOTOS →
        </Link>
      </section>
    </main>
  );
}