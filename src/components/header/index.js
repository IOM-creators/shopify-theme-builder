import { h, render } from "preact";
import Havigation from "./Navigation";
import "./styles.scss";

export default (element, data) => {
  console.log(element, data);
  const init = () => {
    render(<Havigation menu={data.menu} />, element);
  };
  init();
};
