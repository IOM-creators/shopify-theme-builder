import { h, render } from "preact";
import { Collection } from "./Collection";

export default (element, data) => {
  const init = () => {
    render(<Collection products={[]} />, element);
  };
  init();
};
