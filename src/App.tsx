import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout";
import { ROUTES } from "./utils/constants";
import { useAuthState } from "./utils/firebase/hooks";
import { Loader } from "./components";
import {
  AuthPage,
  PokemonPage,
  PokemonsPage,
  ProfilePage,
  SettingsPage,
  UsersPage,
} from "./pages";

export const Auth = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<AuthPage />} />
    <Route path="*" element={<Navigate to="/auth" />} />
  </Routes>
);

const App = () => {
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
            <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            <Route path={ROUTES.USERS} element={<UsersPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
export default App;
