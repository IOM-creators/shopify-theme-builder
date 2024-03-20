import { h } from "preact";

let cartState: any = null;
let cartStateCallback: any = null;

export const getCartState = () => cartState;

export const setCartState = (value) => {
  cartState = value;
  if (cartStateCallback) {
    cartStateCallback(value);
  }
};

export const subscribeToCartState = (callback) => {
  cartStateCallback = callback;
};

let miniCartState: any = null;
let miniCartStateCallback: any = null;

export const getMiniCartState = () => miniCartState;

export const setMiniCartState = (value) => {
  miniCartState = value;
  if (miniCartStateCallback) {
    miniCartStateCallback(value);
  }
};

export const subscribeToMiniCartState = (callback) => {
  miniCartStateCallback = callback;
};
