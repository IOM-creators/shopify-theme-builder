import { h, render } from "preact";
import { Collection } from "./Collection";

export default (element, data) => {
  const init = () => {
    render(<Collection settings={data} />, element);
  };
  init();
};
