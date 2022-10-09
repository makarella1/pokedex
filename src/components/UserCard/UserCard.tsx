import { nanoid } from "nanoid";
import React from "react";

import userDefault from "../../assets/img/user_default.png";
import { PokemonTeam, PokemonTeamMember } from "../pokemon";

interface UserCardProps {
  user: UserDocument;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="mb-4 flex flex-col rounded-xl bg-white p-4" key={nanoid()}>
    <div className="flex items-center gap-4">
      <img
        className="h-24 w-24 rounded-full"
        src={user.photoURL ?? userDefault}
        alt={user.displayName}
      />
      <p className="font-bold">{user.displayName}</p>
    </div>
    {user.pokemons.length > 0 && (
      <PokemonTeam>
        {user.pokemons.map((pokemon) => (
          <PokemonTeamMember name={pokemon.name} />
        ))}
      </PokemonTeam>
    )}
  </div>
);
