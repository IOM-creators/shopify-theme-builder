import { h, FunctionalComponent } from "preact";
interface ICartItem {
  item: {
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image: {
      url: string;
    };
    product: {
      title: string;
    };
  };
}

export const CartItem: FunctionalComponent<ICartItem> = ({ item }) => {
  return (
    <div class="cart-item">
      <div className="img-wrapper">
        <img src={item.image.url} alt="" width={150} />
      </div>
      <h3>{item.product.title}</h3>
      <span>
        {item.price.amount}
        {item.price.currencyCode}
      </span>
    </div>
  );
};
