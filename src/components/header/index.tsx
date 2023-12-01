import { h, render } from "preact";
import { Navigation } from "./Navigation";
import "./styles.scss";

const header = (element, data) => {
  const init = () => {
    render(<Navigation menu={data.menu} />, element);
  };
  init();
};

export default header;
