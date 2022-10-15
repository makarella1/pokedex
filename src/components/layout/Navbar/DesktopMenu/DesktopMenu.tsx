import { clsx } from "clsx";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../../../../utils/constants";

import styles from "./DesktopMenu.module.css";

export const DesktopMenu = () => (
  <ul className={styles.navLinks}>
    <li>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.active)
        }
        to={ROUTES.POKEMONS}
      >
        Pokemons
      </NavLink>
    </li>
    <li>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.active)
        }
        to={ROUTES.PROFILE}
      >
        Profile
      </NavLink>
    </li>
    <li>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.active)
        }
        to={ROUTES.USERS}
      >
        Users
      </NavLink>
    </li>
    <li>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.menuLink, isActive && styles.active)
        }
        to={ROUTES.SETTINGS}
      >
        Settings
      </NavLink>
    </li>
  </ul>
);
