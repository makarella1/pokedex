import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout";
import { ROUTES } from "./utils/constants";
import { useAuthState } from "./utils/firebase/hooks";
import { Loader } from "./components";
import {
  AuthPage,
  PokedexPage,
  PokemonPage,
  PokemonsPage,
  ProfilePage,
} from "./pages";

export const Auth = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<AuthPage />} />
    <Route path="*" element={<Navigate to="/auth" />} />
  </Routes>
);

const App: React.FC = () => {
  const { data: user, isLoading } = useAuthState();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!user && <Auth />}
      {user && (
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
            <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
            <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
export default App;
