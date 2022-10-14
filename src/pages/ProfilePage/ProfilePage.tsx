import { nanoid } from "nanoid";
import React from "react";

import { Loader, PageLayout, UserCard } from "../../components";
import { PokemonShortCard } from "../../components/pokemon";
import { useAuthState } from "../../utils/firebase/hooks";

import styles from "./ProfilePage.module.css";

export const ProfilePage: React.FC = () => {
  const { data: user, isLoading } = useAuthState();

  if (isLoading || !user) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <UserCard user={user} className={styles.card} />
      {user.pokemons.length > 0 && (
        <div className={styles.pokemons}>
          {user.pokemons.map((pokemon) => (
            <PokemonShortCard name={pokemon.name} key={nanoid()} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};
