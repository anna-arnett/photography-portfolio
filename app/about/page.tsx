import Link from "next/link";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* TOP */}
      <section className={styles.top}>
        <div className={styles.topRule}>
          <span>ABOUT</span>
          <span>ANNA ARNETT PHOTOGRAPHY</span>
          <span>CHICAGO, IL</span>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <figure className={styles.introPhoto}>
          <img
            src="/photos/gradpic.jpg"
            alt="Anna Arnett"
          />
        </figure>

        <div className={styles.introCopy}>

          <h1>
            About your photographer
          </h1>

          <div className={styles.introText}>
            <p>
              Photography has been my favorite hobby for several years now, and now that I graduated college, I finally feel like I have the time to take it more seriously. I'm a Notre Dame grad, a Wisconsin native, and the oldest of 4 sisters (who I make model for me a lot, as you can tell).
            </p>

            <p>
              I also have a day job if you can believe it! My degree is in Computer Science and I'm currently a full-time Software Engineer (I even made this website to prove it). Luckily, my favorite lighting is a post-5pm sunset.
            </p>

            <p>
              Besides working and taking pictures, I really love reading (big sci-fi fan), watching sitcoms with my roommate, any time spent at the lakefront or on a patio, and random side quests all over Chicago. I am also trying really hard to learn how to make latte art with my espresso machine and would welcome any tips you may have.
            </p>

          </div>
        </div>
      </section>

      {/* WHY PHOTOGRAPHY */}
      <section className={styles.why}>
        <div className={styles.whyImage}>
          <img
            src="/photos/shadow.jpg"
            alt="Portrait with patterned light and shadow"
          />
        </div>

        <div className={styles.whyCopy}>
          <p className={styles.lightKicker}>WHY PHOTOGRAPHY</p>

          <h2>
            I like catching
            <br />
            <em>what changes.</em>
          </h2>

          <p>
            Light shifts. People move. Expressions disappear in half a
            second. Places look completely different depending on the time of
            day.
          </p>

          <p>
            That&apos;s probably what keeps me interested in photography:
            taking something temporary and getting to keep one little piece
            of it.
          </p>

          <p>
            I love the polished portraits too — but usually my favorite image
            from a shoot is the one with a little movement, an unexpected
            shadow, a real laugh, or something we didn&apos;t completely plan.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.process}>
        <div className={styles.processHeader}>
          <div>
            <p className={styles.kicker}>SHOOTING WITH ME</p>

            <h2>
              Relaxed, directed,
              <br />
              <em>never too serious.</em>
            </h2>
          </div>

          <p className={styles.processIntro}>
            You don&apos;t need to know how to pose. My job is to give you
            enough direction that you never feel awkward while leaving enough
            room for the photos to feel natural.
          </p>
        </div>

        <div className={styles.steps}>
          <article className={styles.step}>
            <span>01</span>

            <h3>Before</h3>

            <p>
              We&apos;ll figure out the general look, location, outfits, and
              anything you want the photos to feel like. References are very
              welcome.
            </p>
          </article>

          <article className={styles.step}>
            <span>02</span>

            <h3>During</h3>

            <p>
              I&apos;ll give you prompts and direction, move around with you,
              and pay attention to the light and environment as we go. We can
              try the planned ideas and the random ones.
            </p>
          </article>

          <article className={styles.step}>
            <span>03</span>

            <h3>After</h3>

            <p>
              I&apos;ll edit the strongest photographs into a cohesive gallery
              that still feels like you — warm, natural, and not overly
              processed.
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>
          Sound like your kind
          <br />
          <em>of photo shoot?</em>
        </h2>

        <Link href="/inquire">
          LET&apos;S PLAN IT →
        </Link>
      </section>
    </main>
  );
}