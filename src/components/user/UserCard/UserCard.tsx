import { nanoid } from "nanoid";
import React from "react";

import userDefault from "../../../assets/img/user_default.png";
import { PokemonTeam, PokemonTeamMember } from "../../pokemon";

import styles from "./UserCard.module.css";

interface UserCardProps {
  user: UserDocument;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className={styles.card} key={nanoid()}>
    <div className={styles.info}>
      <img
        className={styles.image}
        src={user.photoURL ?? userDefault}
        alt={user.displayName}
      />
      <p className={styles.name}>{user.displayName}</p>
    </div>
    {user.pokemons.length > 0 && (
      <PokemonTeam>
        {user.pokemons.map((pokemon) => (
          <PokemonTeamMember name={pokemon.name} key={nanoid()} />
        ))}
      </PokemonTeam>
    )}
    {!user.pokemons.length && (
      <p className={styles.text}>This user has no team</p>
    )}
  </div>
);
