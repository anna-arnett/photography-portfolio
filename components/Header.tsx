"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setWorkOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (
        workRef.current &&
        !workRef.current.contains(event.target as Node)
      ) {
        setWorkOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <div>
          <p className={styles.name}>Anna Arnett</p>
          <p className={styles.label}>Photography</p>
        </div>
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        {/* WORK DROPDOWN */}
        <div
          ref={workRef}
          className={styles.workMenu}
          onMouseEnter={() => setWorkOpen(true)}
          onMouseLeave={() => setWorkOpen(false)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setWorkOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setWorkOpen(false);
              toggleRef.current?.focus();
            }
          }}
        >
          <div className={styles.workTrigger}>
            <Link href="/work">Work</Link>

            <button
              ref={toggleRef}
              type="button"
              className={`${styles.dropdownToggle} ${
                workOpen ? styles.toggleOpen : ""
              }`}
              onClick={() => setWorkOpen((open) => !open)}
              aria-label="Toggle work categories"
              aria-expanded={workOpen}
              aria-controls="work-dropdown"
            >
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            id="work-dropdown"
            className={`${styles.dropdown} ${
              workOpen ? styles.dropdownOpen : ""
            }`}
            inert={!workOpen}
          >
            <div className={styles.dropdownInner}>
              <Link
                href="/work/seniors"
                onClick={() => setWorkOpen(false)}
              >
                Seniors
              </Link>

              <Link
                href="/work/portraits"
                onClick={() => setWorkOpen(false)}
              >
                Portraits + Headshots
              </Link>

              <Link
                href="/work/creative"
                onClick={() => setWorkOpen(false)}
              >
                Misc.
              </Link>
            </div>
          </div>
        </div>

        <Link href="/about">About</Link>

        <Link href="/inquire">Inquire</Link>
      </nav>
    </header>
  );
}