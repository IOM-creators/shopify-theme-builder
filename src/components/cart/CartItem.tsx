import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

interface ICartItem {
  item: any;
}

export const CartItem: FunctionalComponent<ICartItem> = ({ item }) => {
  return <div class="cart-item"></div>;
};
