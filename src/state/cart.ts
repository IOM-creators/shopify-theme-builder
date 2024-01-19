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
