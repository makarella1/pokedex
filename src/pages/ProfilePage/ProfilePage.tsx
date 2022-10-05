import { nanoid } from "nanoid";
import React from "react";

import { Loader, UserCard } from "../../components";
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
      <UserCard user={user} />
      <div>
        {user.pokemons.map((pokemon) => (
          <PokemonEvolutionChainItem name={pokemon.name} key={nanoid()} />
        ))}
      </div>
    </div>
  );
};
