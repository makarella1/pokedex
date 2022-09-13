import React from 'react';

interface PokemonProps {
  pokemon: any;
}

export const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => (
  <div className="flex flex-col justify-center items-center shadow rounded p-4">
    <img
      className="w-24 h-24"
      src={pokemon.sprites.front_default}
      alt={pokemon.name}
    />
    <h2 className="w-full text-center capitalize font-semibold text-xl">
      {pokemon.name}
    </h2>
  </div>
);
