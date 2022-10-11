import React from "react";

import pokemonLogo from "../../../assets/img/pokemon_logo.png";
import { Switcher } from "../../UI";

import { DesktopMenu } from "./DesktopMenu/DesktopMenu";
import { Hamburger } from "./MobileMenu/Hamburger";

import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => (
  <nav className={styles.nav}>
    <div className={styles.left}>
      <img className={styles.logo} src={pokemonLogo} alt="Logo" />
      <DesktopMenu />
    </div>
    <div className={styles.right}>
      <Switcher />
      <Hamburger />
    </div>
  </nav>
);
