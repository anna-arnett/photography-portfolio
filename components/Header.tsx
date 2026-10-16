import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <div>
          <p className={styles.name}>Anna Arnett</p>
          <p className={styles.label}>Photography</p>
        </div>
      </Link>

      <nav className={styles.nav}>
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/inquire">Inquire</Link>
      </nav>
    </header>
  );
}