import { h } from "preact";
import { getCart } from "../../storefront/graphql/send-request";
import { getData } from "../../helpers/get-data";
import { CartItem } from "./CartItem";

export const CartItems = () => {
  const data = getData(getCart());
  const cartItems = data?.cart
    ? data.cart?.lines?.nodes?.map((node) => node?.merchandise)
    : [];
  return (
    <div className="cart-wrapper">
      <div className="cart-items grid grid-cols-4 gap-4">
        {cartItems.map((item: any) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
};
