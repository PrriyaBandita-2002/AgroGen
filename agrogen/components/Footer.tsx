// components/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import styles from "../styles/Footer.module.css"; // Import the CSS module for styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">AgroGen</Link>
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <div className={styles.copyRight}>
          <p>&copy; {new Date().getFullYear()} AgroGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
