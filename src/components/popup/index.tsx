import { h, render } from "preact";
import { Popup } from "./Popup";

export default (element, data) => {
  const init = () => {
    render(<Popup />, element);
  };
  init();
};
