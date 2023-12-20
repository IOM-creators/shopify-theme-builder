import { h, render } from "preact";
import { Navigation } from "./Navigation";

export default (element, data) => {
  const init = () => {
    render(<Navigation menu={data.menu} />, element);
  };
  init();
};
