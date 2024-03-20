import {
  createContext,
  ComponentChildren,
  h,
  FunctionComponent,
  Fragment,
} from "preact";
import { useContext, useState } from "preact/hooks";

type PopupState = {
  state: boolean;
  title?: string;
  content?: ComponentChildren;
};
interface GlobalState {
  cart: any;
  collection: any;
  miniCart: boolean;
  popupState: PopupState;
}

interface GlobalStateContextValue {
  globalState: GlobalState;
  setCart: (cart: any) => void;
  setCollection: (collection: any) => void;
  setMiniCart: (miniCart: boolean) => void;
  setPopupState: (popupState: PopupState) => void;
}

const defaultValue: GlobalStateContextValue = {
  globalState: {
    cart: null,
    collection: null,
    miniCart: false,
    popupState: {
      state: false,
      title: "",
      content: <Fragment></Fragment>,
    },
  },
  setCart: () => {},
  setCollection: () => {},
  setMiniCart: () => {},
  setPopupState: () => {},
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
  const [popupState, setPopupState] = useState<any>(
    defaultValue.globalState.popupState
  );

  return (
    <GlobalStateContext.Provider
      value={{
        globalState: { cart, collection, miniCart, popupState },
        setCart,
        setCollection,
        setMiniCart,
        setPopupState,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextValue => {
  return useContext(GlobalStateContext);
};
