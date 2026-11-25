import type { Metadata } from "next";
import {
  createPageMetadata,
  isIndexablePortrait,
} from "../../../seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { portraitShoots } from "../shoots";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shoot: string }>;
}): Promise<Metadata> {
  const { shoot: slug } = await params;

  const shoot = portraitShoots.find(
    (item) => item.slug === slug
  );

  if (!shoot) {
    notFound();
  }

  return createPageMetadata({
    title:
      `${shoot.name} - ${shoot.type} Photography in ` +
      shoot.location,
    description:
      `Explore the ${shoot.name} photography session ` +
      `in ${shoot.location}, photographed by Anna Arnett ` +
      `in ${shoot.date}.`,
    path: `/work/portraits/${shoot.slug}`,
    image: shoot.cover,
    imageAlt: `${shoot.name} - ${shoot.type}`,
    index: isIndexablePortrait(shoot),
  });
}

export function generateStaticParams() {
  return portraitShoots.map((shoot) => ({
    shoot: shoot.slug,
  }));
}

export default async function PortraitShootPage({
  params,
}: {
  params: Promise<{ shoot: string }>;
}) {
  const { shoot: slug } = await params;

  const shootIndex = portraitShoots.findIndex(
    (item) => item.slug === slug
  );

  if (shootIndex === -1) {
    notFound();
  }

  const shoot = portraitShoots[shootIndex];

  const previous =
    portraitShoots[
      (shootIndex - 1 + portraitShoots.length) %
        portraitShoots.length
    ];

  const next =
    portraitShoots[
      (shootIndex + 1) %
        portraitShoots.length
    ];

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.rule}>
          <Link href="/work/portraits">
            ← PORTRAIT INDEX
          </Link>

          <span>
            {String(shootIndex + 1).padStart(3, "0")}
          </span>
        </div>

        <div className={styles.heading}>
          <div>
            <p>{shoot.type.toUpperCase()}</p>
            <h1>{shoot.name}</h1>
          </div>

          <div className={styles.meta}>
            <div>
              <span>LOCATION</span>
              <p>{shoot.location}</p>
            </div>

            <div>
              <span>YEAR</span>
              <p>{shoot.date}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        {shoot.photos.map((photo, index) => (
          <figure
            className={styles.photo}
            key={`${photo.src}-${index}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        ))}
      </section>

      <nav className={styles.nextShoot}>
        <Link href={`/work/portraits/${previous.slug}`}>
          <span>← PREVIOUS</span>
          <strong>{previous.name}</strong>
        </Link>

        <Link href={`/work/portraits/${next.slug}`}>
          <span>NEXT →</span>
          <strong>{next.name}</strong>
        </Link>
      </nav>

      <section className={styles.cta}>
        <p>YOUR TURN</p>

        <h2>Let&apos;s take some photos.</h2>

        <Link href="/inquire">
          INQUIRE →
        </Link>
      </section>
    </main>
  );
}