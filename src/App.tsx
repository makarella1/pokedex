import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout";
import { ROUTES } from "./utils/constants";
import { useStore } from "./utils/contexts";
import { AuthPage, PokedexPage, PokemonPage, PokemonsPage } from "./pages";

export const Auth = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<AuthPage />} />
    <Route path="*" element={<Navigate to="/auth" />} />
  </Routes>
);

const App: React.FC = () => {
  const {
    session: { isLoggedIn },
    setStore,
  } = useStore();

  return (
    <>
      {!isLoggedIn && <Auth />}
      {isLoggedIn && (
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
            <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
            <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
          </Route>
        </Routes>
      )}
      <button
        onClick={() => setStore({ session: { isLoggedIn: !isLoggedIn } })}
      >
        Change login state
      </button>
    </>
  );
};

export default App;
