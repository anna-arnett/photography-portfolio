import Link from "next/link";
import styles from "./page.module.css";

export default function CreativePage() {
  return (
    <main className={styles.page}>
      {/* TOP RULE */}
      <section className={styles.top}>
        <div className={styles.topRule}>
          <Link href="/work">← SELECTED WORK</Link>
          <span>CREATIVE SHOOTS</span>
          <span>CHICAGO, IL</span>
        </div>
      </section>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroRule}>
          <span>VOL. 01</span>
          <span>EXPERIMENTS IN LIGHT / MOTION / PLACE</span>
        </div>

        <div className={styles.heroComposition}>
          <figure className={styles.heroMain}>
            <img
              src="/photos/motion-dance.jpg"
              alt="Experimental portrait in falling snow"
              loading="eager"
              decoding="async"
            />
          </figure>

          <figure className={styles.heroInset}>
            <img
              src="/photos/shadow.jpg"
              alt="Portrait with patterned shadow"
              loading="eager"
              decoding="async"
            />
          </figure>

          <div className={styles.heroTitle}>
            <p>ANNA ARNETT / CREATIVE WORK</p>

            <h1>
              Field
              <br />
              <em>Notes</em>
            </h1>
          </div>
        </div>

        <div className={styles.heroBottom}>
          <p>
            A place for movement, shadows, reflections, odd framing, blur,
            places, details, and ideas that seemed worth trying.
          </p>

          <Link href="/inquire">
            PLAN A CREATIVE SHOOT →
          </Link>
        </div>
      </section>

      {/* STUDY 01 */}
      <section className={styles.study}>
        <div className={styles.studyHeader}>
          <span>STUDY 01</span>
          <span>LIGHT + SHADOW</span>
        </div>

        <div className={styles.studyOneLayout}>
          <figure className={styles.studyOnePrimary}>
            <img
              src="/photos/shadow.jpg"
              alt="Portrait using patterned light and shadow"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className={styles.studyCopy}>
            <span>01</span>

            <h2>
              Light changes
              <br />
              <em>everything.</em>
            </h2>

            <p>
              Hard light, soft light, strange shadows, reflections, and
              whatever happens when the light becomes part of the portrait.
            </p>
          </div>

          <figure className={styles.studyOneSecondary}>
            <img
              src="/photos/sam.jpg"
              alt="Creative portrait in natural light"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      {/* STUDY 02 */}
      <section className={`${styles.study} ${styles.darkStudy}`}>
        <div className={styles.studyHeader}>
          <span>STUDY 02</span>
          <span>MOTION</span>
        </div>

        <div className={styles.studyTwoLayout}>
          <figure className={styles.studyTwoSmall}>
            <img
              src="/photos/strike2.jpg"
              alt="Black and white figure in water"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className={styles.studyTwoLarge}>
            <img
              src="/photos/motion-dance.jpg"
              alt="Experimental portrait in snow"
              loading="lazy"
              decoding="async"
            />

            <div className={styles.motionTitle}>
              <span>02 / MOVEMENT STUDY</span>

              <h2>Don&apos;t hold still.</h2>
            </div>
          </figure>

          <div className={styles.motionCopy}>
            <p>
              Blur, movement, imperfect timing, and photographs that feel like
              they happened instead of being arranged.
            </p>
          </div>
        </div>
      </section>

      {/* STUDY 03 */}
      <section className={styles.study}>
        <div className={styles.studyHeader}>
          <span>STUDY 03</span>
          <span>PLACE</span>
        </div>

        <div className={styles.studyThreeLayout}>
          <div className={styles.placeIntro}>
            <span>03</span>

            <h2>
              The background
              <br />
              <em>gets a say.</em>
            </h2>

            <p>
              Alleys, water, plants, architecture, weather — I like when the
              environment does more than sit quietly behind the subject.
            </p>
          </div>

          <figure className={styles.trainPhoto}>
            <img
              src="/photos/traincool.jpg"
              alt="Chicago train framed through foliage and architecture"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className={styles.conversePhoto}>
            <img
              src="/photos/converse.jpg"
              alt="Water splashing around Converse shoes"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.closingRule}>
          <span>END NOTES</span>
          <span>VOL. 01</span>
        </div>

        <div className={styles.closingContent}>
          <p>HAVE A WEIRD IDEA?</p>

          <h2>
            I&apos;m probably
            <br />
            <em>interested.</em>
          </h2>

          <p className={styles.closingCopy}>
            Bring a reference, a location, an outfit, a half-formed concept, or
            just the urge to make something different.
          </p>

          <Link href="/inquire">
            INQUIRE ABOUT A CREATIVE SHOOT →
          </Link>
        </div>
      </section>
    </main>
  );
}