"use client";

import { useRef } from "react";
import styles from "./PhotoCarousel.module.css";

type CarouselPhoto = {
  src: string;
  alt: string;
  ratio?: "portrait" | "landscape" | "square";
};

type PhotoCarouselProps = {
  photos: CarouselPhoto[];
};

export default function PhotoCarousel({
  photos,
}: PhotoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;

    if (!track) return;

    const amount = track.clientWidth * 0.72;

    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.carousel}>
      <div className={styles.header}>
        <p>CONTINUED</p>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous photographs"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next photographs"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} ref={trackRef}>
          {photos.map((photo, index) => (
            <figure
              key={`${photo.src}-${index}`}
              className={`${styles.photo} ${
                styles[photo.ratio ?? "portrait"]
              }`}
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
      </div>
    </section>
  );
}