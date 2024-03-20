import { h, render } from "preact";
import { MiniCartItems } from "./MiniCartItems";

export const MiniCart = ({ data }) => {
  return <MiniCartItems data={data} />;
};
