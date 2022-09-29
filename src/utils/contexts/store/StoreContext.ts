import React from "react";

type Store = {
  session: {
    isLoggedIn: boolean;
  };
};

export interface StoreContextProps {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
}

export const StoreContext = React.createContext<StoreContextProps>({
  store: { session: { isLoggedIn: false } },
  setStore: () => {},
});
