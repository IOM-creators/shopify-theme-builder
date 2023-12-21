import { h, FunctionalComponent } from "preact";
import { Image } from "../image";

interface ICartItem {
  item: {
    quantity: number;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
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
  return (
    <div class="cart__item grid grid-cols-4 gap-10">
      <div className="cart__item-image">
        {item.image && <Image image={item.image} className="before:pt-[50%]" />}
      </div>
      <h3 className="cart__item-title">{item.product.title}</h3>
      <span className="cart__item-quantity">{item.quantity}</span>
      <span className="cart__item-price">
        {item.price.amount}
        {item.price.currencyCode}
      </span>
    </div>
  );
};
