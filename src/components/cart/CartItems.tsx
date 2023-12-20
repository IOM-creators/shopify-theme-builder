import { h } from "preact";
import { getCart } from "../../storefront/graphql/send-request";
import { getData } from "../../helpers/get-data";
import { CartItem } from "./CartItem";

export const CartItems = () => {
  const data = getData(getCart());
  console.log("data", data);
  if (!data?.cart) return null;
  const cartItems = data.cart.lines.nodes.map((node) => ({
    ...node,
    ...node.merchandise,
  }));
  return (
    <div className="cart__wrapper">
      <div className="cart__container container">
        <div className="cart__items grid grid-cols-1 gap-10 py-10">
          {cartItems.map((item: any) => (
            <CartItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
