import { h, FunctionalComponent } from "preact";
import { Image } from "../image";
import { Button } from "../button";
import {
  removeFromCart,
  updateCartItem,
} from "../../storefront/graphql/send-request";
import { setCartState } from "../../state/cart";
import { useState } from "preact/hooks";

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
}

export const CartItem: FunctionalComponent<ICartItem> = ({ item }) => {
  const [isLoading, setLoading] = useState(false);

  const handleRemoveItem = async (id) => {
    setLoading(true);
    const res = await removeFromCart(id);
    if (res.cartLinesRemove) {
      setCartState(res.cartLinesRemove);
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id, quantity) => {
    setLoading(true);
    const res = await updateCartItem(id, quantity);
    if (res.cartLinesUpdate) {
      setCartState(res.cartLinesUpdate);
      setLoading(false);
    }
  };

  return (
    <div className="cart__item grid grid-cols-cart-items gap-10">
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
          onClick={() => handleUpdateItem(item.lineId, item.quantity + 1)}
        >
          +
        </Button>
        <span className="cart__item-quantity">{item.quantity}</span>
        <Button
          className="px-4"
          onClick={() => handleUpdateItem(item.lineId, item.quantity - 1)}
        >
          -
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
