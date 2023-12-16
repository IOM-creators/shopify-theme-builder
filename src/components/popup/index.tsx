import { h, render } from "preact";
import { Popup } from "./Popup";

import "./styles.scss";

export default (element, data) => {
  const init = () => {
    render(<Popup />, element);
  };
  init();
};
