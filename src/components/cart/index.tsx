import { h, render } from "preact";
import { CartItems } from "./CartItems";

export default (element, data) => {
  const init = () => {
    render(
      <div className="cart-wrapper">
        <CartItems />
      </div>,
      element
    );
  };
  init();
};
