import { createContext, h, FunctionComponent } from "preact";
import { useContext, useState } from "preact/hooks";

interface GlobalState {
  cart: any;
  collection: any;
  miniCart: boolean;
}

interface GlobalStateContextValue {
  globalState: GlobalState;
  setCart: (cart: any) => void;
  setCollection: (collection: any) => void;
  setMiniCart: (miniCart: boolean) => void;
}

const defaultValue: GlobalStateContextValue = {
  globalState: {
    cart: null,
    collection: null,
    miniCart: false,
  },
  setCart: () => {},
  setCollection: () => {},
  setMiniCart: () => {},
};

const GlobalStateContext = createContext<GlobalStateContextValue>(defaultValue);

export const GlobalStateProvider: FunctionComponent = ({ children }) => {
  const [cart, setCart] = useState<any>(defaultValue.globalState.cart);
  const [collection, setCollection] = useState<any>(
    defaultValue.globalState.collection
  );
  const [miniCart, setMiniCart] = useState<any>(
    defaultValue.globalState.miniCart
  );

  console.log("cart", cart);
  console.log("collection", collection);
  console.log("miniCart", miniCart);
  return (
    <GlobalStateContext.Provider
      value={{
        globalState: { cart, collection, miniCart },
        setCart,
        setCollection,
        setMiniCart,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextValue => {
  return useContext(GlobalStateContext);
};
