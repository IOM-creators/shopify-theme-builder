import { h, render } from "preact";
import { getCart } from "../../storefront/graphql/send-request";
import { getData } from "../../helpers/get-data";
import { CartItem } from "./CartItem";

export const CartItems = () => {
  const cart = getData(getCart());
  const cartItems = cart?.lines || [cart];
  console.log("cart", cart);

  return (
    <div className="cart-wrapper">
      <div className="cart-items">
        {cartItems.map((item: any) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
};
