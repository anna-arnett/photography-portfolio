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
          <h1>
            Inquire
          </h1>
        </div>

        <div className={styles.introRight}>
          <p>
            The sessions below are just an example of what a shoot could look like,
            I'm happy to adjust or do something completely different, just reach out!
          </p>

          <p>
            I&apos;m based in Chicago and available for select travel.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.services}>
        <div className={styles.servicesRule}>
          <span>RATES</span>
          <span>01—04</span>
        </div>

        <div className={styles.serviceGrid}>
          <Link href="/work/seniors" className={styles.service}>
            <span>01</span>

            <div>
              <h2>Senior/Grad Portraits · $150</h2>
              <p>
                60-75 min · Unlimited outfits · Unlimited locations · 30-45 edited photos
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </Link>

          <Link href="/work/portraits" className={styles.service}>
            <span>02</span>

            <div>
              <h2>Headshots · $50 </h2>
              <p>
                 20 min · Unlimited outfits · 10 edited photos
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </Link>

          <Link href="/work/creative" className={styles.service}>
            <span>03</span>

            <div>
              <h2>Portraits · $100</h2>
              <p>
                 60 min · Unlimited outfits · 20-30 edited photos
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </Link>

          <div className={styles.service}>
            <span>04</span>

            <div>
              <h2>Couples · $100</h2>
              <p>
                60 min · Unlimited outfits · 20-30 edited photos
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section className={styles.inquiry}>
        <div className={styles.inquiryInfo}>
          <div>
            <p className={styles.lightKicker}>START HERE</p>

            <h2>
              Tell me what your vision is!
            </h2>

            <p className={styles.inquiryCopy}>
              No need to have all the details, a simple overview is good enough and we can figure out the rest.
            </p>
          </div>

          <div className={styles.goodToInclude}>
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
              placeholder="What would your dream photos look like?"
            />
          </label>

          <label>
            <span>GENERAL BUDGET?</span>
            <input
              type="text"
              name="referral"
              placeholder="Hoping to keep it under X amount..."
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