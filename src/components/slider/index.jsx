import { h, render } from "preact";
import { Slider } from "./Slider.jsx";

import "./styles.scss";

export default (element, data) => {
  console.log(element, data);
  const init = () => {
    render(<Slider menu={data.products} />, element);
  };
  init();
};
