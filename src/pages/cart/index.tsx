import { h, render } from "preact";
import { CartItems } from "./CartItems";

export default (element, data) => {
  render(<CartItems />, element);
};
