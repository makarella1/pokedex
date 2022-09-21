import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { ROUTES } from './utils/constants';
import { AuthPage, PokedexPage, PokemonPage, PokemonsPage } from './pages';

const App: React.FC = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<AuthPage />} />
    <Route element={<Layout />}>
      <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
      <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
      <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
    </Route>
  </Routes>
);

export default App;
