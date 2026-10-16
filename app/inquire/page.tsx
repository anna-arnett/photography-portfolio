import Link from "next/link";
import styles from "./page.module.css";

export default function InquirePage() {
  return (
    <main className={styles.page}>
      {/* TOP */}
      <section className={styles.top}>
        <div className={styles.topRule}>
          <span>INQUIRE</span>
          <span>ANNA ARNETT PHOTOGRAPHY</span>
          <span>CHICAGO, IL</span>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.introLeft}>
          <p className={styles.kicker}>LET&apos;S MAKE SOMETHING</p>

          <h1>
            Have an idea?
            <br />
            <em>I want to hear it.</em>
          </h1>
        </div>

        <div className={styles.introRight}>
          <p>
            Tell me what you&apos;re imagining — even if it&apos;s only half
            formed. A location, an outfit, a Pinterest board, a graduation,
            new headshots, or simply an excuse to make some good photos.
          </p>

          <p>
            I&apos;m based in Chicago and available for select travel.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.services}>
        <div className={styles.servicesRule}>
          <span>WHAT I SHOOT</span>
          <span>01—04</span>
        </div>

        <div className={styles.serviceGrid}>
          <Link href="/work/seniors" className={styles.service}>
            <span>01</span>

            <div>
              <h2>Seniors</h2>
              <p>
                Relaxed, personality-first senior portraits with room to move,
                explore, and try things.
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </Link>

          <Link href="/work/portraits" className={styles.service}>
            <span>02</span>

            <div>
              <h2>Portraits + Headshots</h2>
              <p>
                Portraits that feel polished without losing the person in
                them.
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </Link>

          <Link href="/work/creative" className={styles.service}>
            <span>03</span>

            <div>
              <h2>Creative Shoots</h2>
              <p>
                Strange shadows, movement, locations, concepts, experiments,
                and ideas worth trying.
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </Link>

          <div className={styles.service}>
            <span>04</span>

            <div>
              <h2>Select Events</h2>
              <p>
                Small events and gatherings where candid, atmospheric
                photography makes sense.
              </p>
            </div>

            <span className={styles.arrow}>✦</span>
          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section className={styles.inquiry}>
        <div className={styles.inquiryInfo}>
          <div>
            <p className={styles.lightKicker}>START HERE</p>

            <h2>
              Tell me a little
              <br />
              <em>about the idea.</em>
            </h2>

            <p className={styles.inquiryCopy}>
              You don&apos;t need to have every detail figured out. Give me
              enough to understand what you&apos;re looking for, and we can
              work out the rest.
            </p>
          </div>

          <div className={styles.goodToInclude}>
            <span>GOOD THINGS TO INCLUDE</span>

            <p>
              what you&apos;re looking for
              <br />
              approximate date
              <br />
              location or neighborhood
              <br />
              any ideas or references
            </p>
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.twoColumns}>
            <label>
              <span>NAME</span>
              <input
                type="text"
                name="name"
                placeholder="Your name"
              />
            </label>

            <label>
              <span>EMAIL</span>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
              />
            </label>
          </div>

          <label>
            <span>WHAT ARE YOU INTERESTED IN?</span>

            <select name="service" defaultValue="">
              <option value="" disabled>
                Choose one
              </option>

              <option value="senior">
                Senior portraits
              </option>

              <option value="portrait">
                Portraits
              </option>

              <option value="headshot">
                Headshots
              </option>

              <option value="creative">
                Creative shoot
              </option>

              <option value="event">
                Event
              </option>

              <option value="other">
                Something else
              </option>
            </select>
          </label>

          <div className={styles.twoColumns}>
            <label>
              <span>IDEAL DATE</span>
              <input
                type="text"
                name="date"
                placeholder="Exact or approximate"
              />
            </label>

            <label>
              <span>LOCATION</span>
              <input
                type="text"
                name="location"
                placeholder="Chicago, neighborhood, etc."
              />
            </label>
          </div>

          <label>
            <span>TELL ME ABOUT IT</span>
            <textarea
              name="message"
              rows={7}
              placeholder="What are you imagining?"
            />
          </label>

          <label>
            <span>HOW DID YOU FIND ME?</span>
            <input
              type="text"
              name="referral"
              placeholder="Instagram, friend, Google..."
            />
          </label>

          <button type="button">
            SEND INQUIRY →
          </button>

          <p className={styles.formNote}>
            Form submission will be connected before launch.
          </p>
        </form>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.closingRule}>
          <span>ANNA ARNETT PHOTOGRAPHY</span>
          <span>CHICAGO + SELECT TRAVEL</span>
        </div>

        <p>
          portraits / seniors / headshots / creative work
        </p>
      </section>
    </main>
  );
}