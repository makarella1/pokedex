import { clsx } from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../../../../utils/constants";

import styles from "./ActiveMobileMenu.module.css";

interface ActiveMobileMenuProps {
  onClose: () => void;
}

export const ActiveMobileMenu: React.FC<ActiveMobileMenuProps> = ({
  onClose,
}) => (
  <div className={styles.menuActive}>
    <NavLink
      className={({ isActive }) =>
        clsx(styles.menuLink, isActive && styles.active)
      }
      to={ROUTES.POKEMONS}
      onClick={() => onClose()}
    >
      Pokemons
    </NavLink>
    <NavLink
      className={({ isActive }) =>
        clsx(styles.menuLink, isActive && styles.active)
      }
      to={ROUTES.PROFILE}
      onClick={() => onClose()}
    >
      Profile
    </NavLink>
    <NavLink
      className={({ isActive }) =>
        clsx(styles.menuLink, isActive && styles.active)
      }
      to={ROUTES.POKEDEX}
      onClick={() => onClose()}
    >
      Pokedex
    </NavLink>
    <NavLink
      className={({ isActive }) =>
        clsx(styles.menuLink, isActive && styles.active)
      }
      to={ROUTES.SETTINGS}
      onClick={() => onClose()}
    >
      Settings
    </NavLink>
  </div>
);
