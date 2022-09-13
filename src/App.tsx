import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './utils/constants';
import { PokedexPage, PokemonsPage } from './pages';

import './App.scss';

const App: React.FC = () => (
  <Routes>
    <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
    <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
  </Routes>
);

export default App;
