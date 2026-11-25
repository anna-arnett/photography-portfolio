import Link from "next/link";
import PhotoCarousel from "@/components/PhotoCarousel";
import styles from "./page.module.css";

const moreFieldNotes = [
  {
    src: "/photos/misc/01.jpg",
    alt: "Experimental photograph taken around a train",
    ratio: "portrait" as const,
  },
  {
    src: "/photos/misc/12.jpg",
    alt: "Chicago",
    ratio: "portrait" as const,
  },
  {
    src: "/photos/misc/10.jpg",
    alt: "Chicago",
    ratio: "portrait" as const,
  },
  {
    src: "/photos/misc/03.jpg",
    alt: "Creative portrait in natural light",
    ratio: "portrait" as const,
  },
  {
    src: "/photos/misc/04.jpg",
    alt: "Creative portrait in natural light",
    ratio: "portrait" as const,
  },
  {
    src: "/photos/misc/05.JPG",
    alt: "Creative portrait in natural light",
    ratio: "landscape" as const,
  },
  {
    src: "/photos/misc/07.jpg",
    alt: "Creative portrait in natural light",
    ratio: "portrait" as const,
  },
  {
    src: "/photos/misc/13.JPG",
    alt: "Creative portrait in natural light",
    ratio: "landscape" as const,
  },

  // Add more whenever you want:
  //
  // {
  //   src: "/photos/new-photo.jpg",
  //   alt: "Description",
  //   ratio: "portrait" as const,
  // },
];

export default function CreativePage() {
  return (
    <main className={styles.page}>
      {/* FIELD NOTES HERO */}
      <section className={styles.hero}>
        <div className={styles.heroRule}>
          <span>CREATIVE</span>
          <span>MISC.</span>
          <span>ANNA ARNETT PHOTOGRAPHY</span>
        </div>

        <div className={styles.heroComposition}>
          <figure className={`${styles.heroPhoto} ${styles.heroPhotoOne}`}>
            <img
              src="/photos/misc/16.JPG"
              alt="Portrait exploring movement"
            />
          </figure>

          <div className={styles.heroTitle}>

            <h1>
                   & <br/>More!
            </h1>
          </div>

          <figure className={`${styles.heroPhoto} ${styles.heroPhotoTwo}`}>
            <img
              src="/photos/shadow.jpg"
              alt="Portrait using patterned light and shadow"
            />
          </figure>

          <p className={styles.heroIntro}>
            A few more miscellaneous photos for good measure
          </p>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className={styles.carouselSection}>
        <PhotoCarousel photos={moreFieldNotes} />
      </section>

    </main>
  );
}