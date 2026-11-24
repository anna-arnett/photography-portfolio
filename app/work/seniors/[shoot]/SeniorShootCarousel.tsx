"use client";

import { useRef, useState } from "react";
import styles from "./SeniorShootCarousel.module.css";

type Photo = {
  src: string;
  alt: string;
};

type SeniorShootCarouselProps = {
  name: string;
  photos: readonly Photo[];
};

export default function SeniorShootCarousel({
  name,
  photos,
}: SeniorShootCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const amount = track.clientWidth * 0.7;

    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const photos = Array.from(
      track.querySelectorAll<HTMLElement>("[data-photo]")
    );

    if (!photos.length) {
      return;
    }

    const trackCenter =
      track.getBoundingClientRect().left +
      track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    photos.forEach((photo, index) => {
      const rect = photo.getBoundingClientRect();
      const photoCenter = rect.left + rect.width / 2;
      const distance = Math.abs(photoCenter - trackCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.rule}>
        <span>{name.toUpperCase()} / FULL SHOOT</span>

        <span>
          {String(photos.length).padStart(2, "0")} IMAGES
        </span>
      </div>

      <div className={styles.controls}>
        <div className={styles.counter}>
          <span>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <span className={styles.counterRule} />

          <span>
            {String(photos.length).padStart(2, "0")}
          </span>
        </div>

        <div className={styles.buttons}>
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

      <div
        className={styles.track}
        ref={trackRef}
        onScroll={handleScroll}
      >
        {photos.map((photo, index) => (
          <figure
            className={styles.photo}
            key={`${photo.src}-${index}`}
            data-photo
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
            />

            <span className={styles.photoNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </figure>
        ))}
      </div>

      <p className={styles.hint}>
        DRAG OR SCROLL TO VIEW THE FULL SHOOT
      </p>
    </div>
  );
}