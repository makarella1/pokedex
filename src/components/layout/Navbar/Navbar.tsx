import React from "react";

import pokemonLogo from "../../../assets/img/pokemon_logo.png";

import { DesktopMenu } from "./DesktopMenu/DesktopMenu";
import { Hamburger } from "./MobileMenu/Hamburger";

import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => (
  <nav className={styles.nav}>
    <div className={styles.logoContainer}>
      <img className={styles.logo} src={pokemonLogo} alt="Logo" />
      <h1 className={styles.title}>Gotta Catch Em All!</h1>
    </div>
    <DesktopMenu />
    <Hamburger />
  </nav>
);
