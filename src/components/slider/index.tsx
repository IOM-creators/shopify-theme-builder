import { h, render } from "preact";
import { Slider } from "./Slider";

import "./styles.scss";

export default (element, data) => {
  const init = () => {
    render(<Slider slides={data.products} />, element);
  };
  init();
};
