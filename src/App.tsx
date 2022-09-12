import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { useGetPokemonQuery } from './api/hooks';
import { PokemonsPage } from './pages';

import './App.scss';

const App: React.FC = () => {
  const [offset, setOffset] = React.useState(0);
  const { data, isFetching, fetchNextPage, isError } = useGetPokemonQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  const pokemons = data.pages.reduce(
    (acc, page) => [...acc, ...page.data.results],
    []
  );

  console.log(pokemons);

  return (
    <div>
      <button onClick={() => fetchNextPage()}>Increase offset</button>
    </div>
  );
};

export default App;
