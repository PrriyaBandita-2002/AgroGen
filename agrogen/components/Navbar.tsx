// components/Navbar.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css"; // Import the CSS module for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link href="/">Agrogen</Link>
        </h1>
        <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/api/crops">Crops</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <span
            className={`${styles.iconBar} ${isOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.iconBar} ${isOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.iconBar} ${isOpen ? styles.open : ""}`}
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
