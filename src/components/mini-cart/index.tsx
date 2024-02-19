import { h, render } from "preact";
import { MiniCart } from "./MiniCart";

export default (element, data) => {
  const init = () => {
    render(<MiniCart />, element);
  };
  init();
};
