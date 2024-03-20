import { h, render } from "preact";
import { MainProduct } from "./MainProduct";

export default (element, data) => {
  // return <MainProduct data={data} />;
  const init = () => {
    render(<MainProduct data={data} />, element);
  };
  init();
};
