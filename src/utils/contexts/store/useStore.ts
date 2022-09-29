import React from "react";

import { StoreContext } from "./StoreContext";

export const useStore = () => {
  const { setStore, ...storeContext } = React.useContext(StoreContext);

  return { setStore, ...storeContext.store };
};
