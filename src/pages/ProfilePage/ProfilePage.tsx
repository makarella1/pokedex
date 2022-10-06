import { nanoid } from "nanoid";
import React from "react";

import { Loader, PageLayout, UserCard } from "../../components";
import {
  PokemonShortCard,
  PokemonTeam,
  PokemonTeamMember,
} from "../../components/pokemon";
import { useAuthState } from "../../utils/firebase/hooks";

export const ProfilePage: React.FC = () => {
  const { data: user, isLoading } = useAuthState();

  if (isLoading || !user) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <UserCard user={user} />
      <PokemonTeam>
        {user.pokemons.map((pokemon) => (
          <PokemonTeamMember name={pokemon.name} key={nanoid()} />
        ))}
      </PokemonTeam>
      <div>
        {user.pokemons.map((pokemon) => (
          <PokemonShortCard name={pokemon.name} key={nanoid()} />
        ))}
      </div>
    </PageLayout>
  );
};
