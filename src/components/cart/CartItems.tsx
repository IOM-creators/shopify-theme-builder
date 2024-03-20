import { h } from "preact";
import { getCart } from "../../storefront/graphql/send-request";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "preact/hooks";
import { useGlobalState } from "../../GlobalStateContext";

export const CartItems = () => {
  const { globalState, setCart } = useGlobalState();

  useEffect(() => {
    console.log("globalState", globalState);

    getCart().then((res) => {
      setCart({ ...res.cart });
    });
  }, []);

  if (!globalState.cart) return null;
  const cartItems = globalState.cart.lines.nodes.map((node) => ({
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
              <CartItem
                item={item}
                className="grid grid-cols-cart-items gap-10"
              />
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
