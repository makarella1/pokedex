import React from "react";

import styles from "./PokemonTeam.module.css";

interface PokemonTeamProps {
  children: React.ReactNode;
}

export const PokemonTeam: React.FC<PokemonTeamProps> = ({ children }) => (
  <div className={styles.team}>{children}</div>
);
