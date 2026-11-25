import { createPageMetadata } from "../../seo";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { seniorShoots } from "./shoots";

export const metadata = createPageMetadata({
  title: "Chicago Senior & Graduation Photographer",
  description:
    "Explore natural, nostalgic senior portraits and graduation photography by Anna Arnett. Chicago-based photographer with senior sessions starting at $150.",
  path: "/work/seniors",
  image: seniorShoots[0]?.cover ?? "/photos/lydiasenior.JPG",
  imageAlt: "Outdoor senior portrait by Anna Arnett",
});

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

          <h1>Seniors!</h1>
        </div>
      </section>

      {/* SHOOT INDEX */}
      <section className={styles.yearbook}>
        <div className={styles.sectionRule}>
          <span>{String(seniorShoots.length)} SHOOTS</span>
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

      {/* CTA */}
      <section className={styles.cta}>
        <h2>
          Let's shoot!
        </h2>

        <Link href="/inquire">
          INQUIRE ABOUT SENIOR PHOTOS →
        </Link>
      </section>
    </main>
  );
}