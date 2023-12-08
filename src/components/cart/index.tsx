import { h, render } from "preact";
import { CartItems } from "./CartItems";

export default function cart(element, data) {
  const init = () => {
    render(
      <div className="cart-wrapper">
        <CartItems />
      </div>,
      element
    );
  };
  init();
}
