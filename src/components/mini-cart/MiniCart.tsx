import { h } from "preact";
import { getCart } from "../../storefront/graphql/send-request";
import { CartItem } from "../cart/CartItem";
import cn from "classnames";

import {
  subscribeToCartState,
  getCartState,
  setCartState,
  subscribeToMiniCartState,
  getMiniCartState,
  setMiniCartState,
} from "../../state/cart";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../button";

export const MiniCart = () => {
  const [cartState, setLocalCartState] = useState(getCartState);
  const [cartMiniState, setLocalMiniCartState] = useState(getMiniCartState);

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
    const callback = (newCartState) => {
      setLocalMiniCartState(newCartState);
    };
    subscribeToMiniCartState(callback);
    return () => {
      subscribeToMiniCartState(null);
    };
  }, []);

  useEffect(() => {
    getCart().then((res) => {
      setCartState(res);
    });
  }, []);

  const handleMinitCart = () => {
    setMiniCartState(!cartMiniState);
  };

  if (!cartState?.cart) return null;
  const cartItems = cartState.cart.lines.nodes.map((node) => ({
    lineId: node.id,
    ...node,
    ...node.merchandise,
  }));
  return (
    <div
      className={cn(
        {
          "opacity-1 visible translate-x-[0]": cartMiniState,
          "opacity-0 invisible translate-x-[100%]": !cartMiniState,
        },
        "mini-cart__wrapper max-w-screen-md fixed top-0 right-0 z-10 w-full h-full bg-white shadow-bottom transition-transform"
      )}
    >
      <div className="mini-cart__header flex items-center py-5">
        <h3 className="text-2xl text-center w-full">Mini Cart</h3>
        <Button
          className="absolute right-4"
          icon="close"
          onlyIcon
          onClick={handleMinitCart}
        />
      </div>
      <div className="mini-cart__container container py-10">
        {cartItems.length ? (
          <div className="mini-cart__items grid grid-cols-1 gap-10">
            {cartItems.map((item: any) => (
              <CartItem item={item} />
            ))}
            <a href="/cart" className="border py-4 px-8 mx-auto">
              View cart
            </a>
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
