import { h, render } from "preact";
import { CartItems } from "./CartItems";

export default (element, data) => {
  const init = () => {
    render(<CartItems />, element);
  };
  init();
};
