import { h, render } from "preact";
import { MainProduct } from "./MainProduct";
import "./styles.scss";

export default (element, data) => {
  const init = () => {
    render(<MainProduct data={data} />, element);
  };
  init();
};
