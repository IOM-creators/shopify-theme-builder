import { h } from "preact";
import { getCart } from "../../storefront/graphql/send-request";
import { CartItem } from "./CartItem";
import {
  subscribeToCartState,
  getCartState,
  setCartState,
} from "../../state/cart";
import { useEffect, useState } from "preact/hooks";

export const CartItems = () => {
  const [cartState, setLocalCartState] = useState(getCartState);

  useEffect(() => {
    const callback = (newCartState) => {
      setLocalCartState(newCartState);
    };
    subscribeToCartState(callback);
    return () => {
      subscribeToCartState(null);
    };
  }, []);

  useEffect(() => {
    getCart().then((res) => {
      setCartState(res);
    });
  }, []);

  if (!cartState?.cart) return null;
  const cartItems = cartState.cart.lines.nodes.map((node) => ({
    lineId: node.id,
    ...node,
    ...node.merchandise,
  }));
  return (
    <div className="cart__wrapper">
      <div className="cart__container container py-10">
        {cartItems.length ? (
          <div className="cart__items grid grid-cols-1 gap-10">
            {cartItems.map((item: any) => (
              <CartItem item={item} />
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-3xl text-center">Cart is empty</h2>
          </div>
        )}
      </div>
    </div>
  );
};
