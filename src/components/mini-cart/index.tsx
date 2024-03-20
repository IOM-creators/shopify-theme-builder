import { h, render } from "preact";
import { MiniCartItems } from "./MiniCartItems";

export const MiniCart = ({ data, element }) => {
  return (
    <div className="mini-cart">
      <MiniCartItems data={data} />
    </div>
  );
};
