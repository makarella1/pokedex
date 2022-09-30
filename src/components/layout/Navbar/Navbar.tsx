import React from "react";
import { Link } from "react-router-dom";

import pokemonLogo from "../../../assets/img/pokemon_logo.png";

import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => (
  <nav className={styles.nav}>
    <div className={styles.logoContainer}>
      <img className={styles.logo} src={pokemonLogo} alt="Logo" />
      <h1 className={styles.title}>Gotta Catch Em All!</h1>
    </div>
    <ul className={styles.navLinks}>
      <li className={styles.navLink}>
        <li className={styles.navLink}>
          <Link to="/">Pokemons</Link>
        </li>
        <Link to="/pokedex">Pokedex</Link>
      </li>
      <li className={styles.navLink}>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </nav>
);
