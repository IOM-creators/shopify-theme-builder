import { h, FunctionalComponent } from "preact";
import { Image } from "../image";
import { Button } from "../button";
import cn from "classnames";

import {
  removeFromCart,
  updateCartItem,
} from "../../storefront/graphql/send-request";
import { setCartState } from "../../store/cart";
import { useState } from "preact/hooks";
import { useGlobalState } from "../../GlobalStateContext";

interface ICartItem {
  item: {
    lineId: string;
    quantity: number;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
    image: {
      src: string;
      altText: string;
    };
    product: {
      title: string;
    };
  };
  className?: string;
}

export const CartItem: FunctionalComponent<ICartItem> = ({
  item,
  className,
}) => {
  const [isLoading, setLoading] = useState(false);
  const { setCart } = useGlobalState();

  const handleRemoveItem = async (id) => {
    setLoading(true);
    const res = await removeFromCart(id);
    if (res.cartLinesRemove) {
      setCart({ ...res.cartLinesRemove.cart });
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id, quantity) => {
    setLoading(true);
    const res = await updateCartItem(id, quantity);
    if (res.cartLinesUpdate) {
      setCart({ ...res.cartLinesUpdate.cart });
      setLoading(false);
    }
  };

  return (
    <div className={cn({}, "cart__item", className)}>
      <div className="cart__item-image">
        {item.image && <Image image={item.image} />}
      </div>
      <h3 className="cart__item-title">{item.product.title}</h3>
      <span className="cart__item-price">
        {item.price.amount}
        {item.price.currencyCode}
      </span>
      <div className="cart__item-quantity flex items-start">
        <Button
          className="px-4"
          onClick={() => handleUpdateItem(item.lineId, item.quantity - 1)}
        >
          -
        </Button>
        <span className="cart__item-quantity">{item.quantity}</span>
        <Button
          className="px-4"
          onClick={() => handleUpdateItem(item.lineId, item.quantity + 1)}
        >
          +
        </Button>
        <Button
          icon="delete"
          onlyIcon
          className="ml-4"
          loading={isLoading}
          onClick={() => handleRemoveItem(item.lineId)}
        />
      </div>
      <span className="cart__item-price">
        {item.cost.totalAmount.amount}
        {item.cost.totalAmount.currencyCode}
      </span>
    </div>
  );
};
