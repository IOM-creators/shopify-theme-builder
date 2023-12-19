import { h, render } from "preact";
import { Collection } from "./Collection";
import "./styles.scss";

export default (element, data) => {
  const init = () => {
    render(<Collection products={[]} />, element);
  };
  init();
};
