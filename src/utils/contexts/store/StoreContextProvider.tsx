import React from "react";

import type { StoreContextProps } from "./StoreContext";
import { StoreContext } from "./StoreContext";

interface StoreContextProviderProps {
  children: React.ReactNode;
}
export const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const [store, setStore] = React.useState<StoreContextProps["store"]>({
    session: {
      isLoggedIn: false,
    },
  });

  const value = React.useMemo(() => ({ store, setStore }), [store]);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
