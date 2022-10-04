import { nanoid } from "nanoid";
import React from "react";

import userDefault from "../../assets/img/user_default.png";
import { Loader } from "../../components";
import { PokemonEvolutionChainItem } from "../../components/pokemon";
import { useAuthState } from "../../utils/firebase/hooks";

import styles from "./ProfilePage.module.css";

export const ProfilePage: React.FC = () => {
  const { data: user, isLoading } = useAuthState();

  if (isLoading || !user) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.profileContainer}>
        <img
          className={styles.profileImage}
          src={user?.photoURL ?? userDefault}
          alt="User Avatar"
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileId}>{user?.uid}</div>
          <div>
            <span className={styles.profileProp}>Name: </span>
            {user?.displayName}
          </div>
          <div>
            <span className={styles.profileProp}>Email: </span>
            {user?.email}
          </div>
        </div>
      </div>
      <div>
        {user.pokemons.map((pokemon) => (
          <PokemonEvolutionChainItem name={pokemon.name} key={nanoid()} />
        ))}
      </div>
    </div>
  );
};
