import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout";
import { ROUTES } from "./utils/constants";
import { useAuthState } from "./utils/firebase/hooks";
import { Loader } from "./components";

const AuthPage = React.lazy(() =>
  import("./pages").then(({ AuthPage }) => ({ default: AuthPage }))
);
const PokemonPage = React.lazy(() =>
  import("./pages").then(({ PokemonPage }) => ({ default: PokemonPage }))
);
const PokemonsPage = React.lazy(() =>
  import("./pages").then(({ PokemonsPage }) => ({ default: PokemonsPage }))
);
const ProfilePage = React.lazy(() =>
  import("./pages").then(({ ProfilePage }) => ({ default: ProfilePage }))
);
const SettingsPage = React.lazy(() =>
  import("./pages").then(({ SettingsPage }) => ({ default: SettingsPage }))
);
const UsersPage = React.lazy(() =>
  import("./pages").then(({ UsersPage }) => ({ default: UsersPage }))
);

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
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};
export default App;
