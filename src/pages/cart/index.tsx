import { h, render } from "preact";
import { CartItems } from "./CartItems";
import "./styles.scss";

export default (element, data) => {
  render(<CartItems />, element);
};
