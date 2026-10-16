import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/photos/converse.jpg"
            alt="Waves breaking around Converse shoes in warm evening light"
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.heroCopy}>
          <div className={styles.heroLogo}>
            <Image
              src="/photos/coffeelogo.png"
              alt=""
              width={80}
              height={80}
              className={styles.coffeeLogo}
            />
          </div>

          <h1>Anna Arnett</h1>

          <p className={styles.heroKicker}>
            Chicago · Portrait + Editorial Photography
          </p>
        </div>

        <a href="#hello" className={styles.explore}>
          EXPLORE ↓
        </a>
      </section>

      {/* EDITORIAL INTRO */}
      <section className={styles.introSpread} id="hello">
        <div className={styles.introRule}>
          <span>ANNA ARNETT PHOTOGRAPHY</span>
          <span>CHICAGO, IL</span>
        </div>

        <figure className={styles.lydiaPhoto}>
          <Image
            src="/photos/lydiasenior.JPG"
            alt="Portrait surrounded by tall grasses and yellow flowers"
            fill
            sizes="(max-width: 800px) 85vw, 30vw"
          />
        </figure>

        <div className={styles.introCopy}>

          <p className={styles.italicIntro}>My work</p>

          <h2>
            Warm, nostalgic portraits for the photo album
          </h2>

          <p className={styles.bodyCopy}>
            I love to take photos! In my work, I take a more editorial approach to traditional portraits, encorporating unique light, shadows, and setting into each shot. 
            <br/>
            <br/>
            My goal in every shoot is to bring a vision to life. Whether that's a straightforward headshot or a creative artistic project, I'd be so excited to help you plan out the concept you're looking for. 
          </p>

          <Link href="/work" className={styles.textLink}>
            VIEW SELECTED WORK →
          </Link>
        </div>

        <figure className={styles.shadowPhoto}>
          <Image
            src="/photos/mary2.jpg"
            alt="Creative portrait using patterned light and shadow"
            fill
            sizes="(max-width: 800px) 65vw, 22vw"
          />
        </figure>

      </section>

      {/* PORTRAIT REEL */}
      <section className={styles.portraitReel}>
        <div className={styles.portraitReelHeader}>
          <p>PORTRAITS / HEADSHOTS / +MORE</p>
          <Link href="/work">SEE MORE →</Link>
        </div>

        <div className={styles.portraitGrid}>
          <figure className={`${styles.reelPhoto} ${styles.reelOne}`}>
            <Image
              src="/photos/place-mirror.jpg"
              alt="Portrait in warm natural light"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelTwo}`}>
            <Image
              src="/photos/ava2.jpg"
              alt="Outdoor portrait"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelThree}`}>
            <Image
              src="/photos/sam.jpg"
              alt="Creative portrait"
              fill
              sizes="(max-width: 800px) 100vw, 25vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelFour}`}>
            <Image
              src="/photos/shadow.jpg"
              alt="Portrait in soft natural light"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>

          <figure className={`${styles.reelPhoto} ${styles.reelFive}`}>
            <Image
              src="/photos/jakeball.jpg"
              alt="Candid laughing portrait"
              fill
              sizes="(max-width: 800px) 50vw, 20vw"
            />
          </figure>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.aboutFeature}>
        <span className={styles.aboutMonogram} aria-hidden="true">
          AA
        </span>

        <div className={styles.aboutFeatureVisual}>
          <figure className={styles.selfPortrait}>
            <Image
              src="/photos/me.jpg"
              alt="Anna Arnett"
              fill
              sizes="(max-width: 800px) 45vw, 18vw"
            />
          </figure>
        </div>

        <div className={styles.aboutFeatureCopy}>
          <p className={styles.lightKicker}>ABOUT ME</p>

          <h2>
            Hi, I&apos;m Anna!
          </h2>

          <p>
            I graduated college in May, and I live in Chicago now! I'm still building up my portfolio and establishing myself as a photographer, so I'm super willing to accommodate all different kinds of photoshoots (and more importantly, it'll be cheap). Click below to learn more about who I am and what the process looks like for shooting with me!
          </p>

          <Link href="/about" className={styles.lightLink}>
            MORE ABOUT ME →
          </Link>
        </div>

        <span className={styles.aboutStar} aria-hidden="true">
          ✦
        </span>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.closingMedia}>
          <Image
            src="/photos/tree.jpg"
            alt="Flowering branches against a blue sky"
            fill
            sizes="100vw"
          />
        </div>

        <div className={styles.closingOverlay} />

        <div className={styles.closingCopy}>
          <p className={styles.lightKicker}>PORTRAITS · CHICAGO</p>

          <h2>Have an idea?</h2>

          <p className={styles.closingAccent}>
            let&apos;s make something.
          </p>

          <Link href="/inquire" className={styles.lightLink}>
            GET IN TOUCH →
          </Link>
        </div>
      </section>
    </main>
  );
}