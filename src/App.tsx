import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './utils/constants';
import { Navbar } from './components';
import { PokedexPage, PokemonPage, PokemonsPage } from './pages';

import './App.scss';

const App: React.FC = () => (
  <>
    <Navbar />
    <Routes>
      <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
      <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
      <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
    </Routes>
  </>
);

export default App;
