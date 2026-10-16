import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { seniorShoots } from "../shoots";

export function generateStaticParams() {
  return seniorShoots.map((shoot) => ({
    shoot: shoot.slug,
  }));
}

export default async function SeniorShootPage({
  params,
}: {
  params: Promise<{ shoot: string }>;
}) {
  const { shoot: slug } = await params;

  const shootIndex = seniorShoots.findIndex(
    (item) => item.slug === slug
  );

  if (shootIndex === -1) {
    notFound();
  }

  const shoot = seniorShoots[shootIndex];

  const previous =
    seniorShoots[
      (shootIndex - 1 + seniorShoots.length) %
        seniorShoots.length
    ];

  const next =
    seniorShoots[
      (shootIndex + 1) % seniorShoots.length
    ];

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <section className={styles.intro}>
        <div className={styles.rule}>
          <Link href="/work/seniors">
            ← THE YEARBOOK
          </Link>

          <span>
            ENTRY {String(shootIndex + 1).padStart(3, "0")}
          </span>
        </div>

        <div className={styles.heading}>
          <div>
            <p>THE YEARBOOK</p>
            <h1>{shoot.name}</h1>
          </div>

          <div className={styles.meta}>
            <div>
              <span>DATE</span>
              <p>{shoot.date}</p>
            </div>

            <div>
              <span>LOCATION</span>
              <p>{shoot.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* OPENING PORTRAIT */}
      <section className={styles.hero}>
        <Image
          src={shoot.cover}
          alt={`${shoot.name} senior portrait`}
          fill
          priority
          sizes="(max-width: 700px) 78vw, 420px"
        />

        <div className={styles.heroLabel}>
          <span>
            {String(shootIndex + 1).padStart(3, "0")}
          </span>

          <span>{shoot.name.toUpperCase()}</span>
        </div>
      </section>

      {/* SHOOT GALLERY */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryRule}>
          <span>{shoot.name.toUpperCase()} / FULL SHOOT</span>

          <span>
            {String(shoot.photos.length).padStart(2, "0")} IMAGES
          </span>
        </div>

        <div className={styles.gallery}>
          {shoot.photos.map((photo, index) => (
            <figure
              className={styles.photo}
              key={`${photo.src}-${index}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* PREVIOUS / NEXT */}
      <nav className={styles.nextShoot}>
        <Link href={`/work/seniors/${previous.slug}`}>
          <span>← PREVIOUS</span>
          <strong>{previous.name}</strong>
        </Link>

        <Link href={`/work/seniors/${next.slug}`}>
          <span>NEXT →</span>
          <strong>{next.name}</strong>
        </Link>
      </nav>

      {/* CTA */}
      <section className={styles.cta}>
        <p>WANT YOUR OWN PAGE?</p>

        <h2>Let&apos;s take yours.</h2>

        <Link href="/inquire">
          INQUIRE ABOUT SENIOR PHOTOS →
        </Link>
      </section>
    </main>
  );
}