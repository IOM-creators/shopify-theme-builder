import { h, render } from "preact";
import Navigation from "./Navigation";
import "./styles.scss";

export default (element, data) => {
  console.log(element, data);
  const init = () => {
    render(<Navigation menu={data.menu} />, element);
  };
  init();
};
