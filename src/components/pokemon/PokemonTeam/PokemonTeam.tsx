import { PropsWithChildren } from "react";

import styles from "./PokemonTeam.module.css";

export const PokemonTeam = ({ children }: PropsWithChildren) => (
  <div className={styles.team}>{children}</div>
);
