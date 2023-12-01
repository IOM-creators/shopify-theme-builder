import { h, render } from "preact";
import { Navigation } from "./Navigation.jsx";
import "./styles.scss";

const header = (element, data) => {
  console.log(element, data);
  const init = () => {
    render(<Navigation menu={data.menu} />, element);
  };
  init();
};

export default header;