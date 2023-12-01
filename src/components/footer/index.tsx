import { h, render } from "preact";
import { Navigation } from "./Navigation";
import "./styles.scss";

const footer = (element, data) => {
  const init = () => {
    render(<Navigation menu={data.menu} />, element);
  };
  init();
};
export default footer;
