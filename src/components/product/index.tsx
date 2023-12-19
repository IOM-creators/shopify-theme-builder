import { h, render } from "preact";
import { ProductCard } from "./ProductCard";
import "./styles.scss";

export default (element, data) => {
  const init = () => {
    render(<ProductCard product={{}} />, element);
  };
  init();
};
