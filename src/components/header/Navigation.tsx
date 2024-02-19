import { h, FunctionalComponent } from "preact";
import { Icon } from "../icon";
import { getCart } from "../../storefront/graphql/send-request";
import { getCartState, subscribeToCartState } from "../../state/cart";
import { useEffect, useState } from "preact/hooks";
interface INavigation {
  menu: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ menu }) => {
  const [cartState, setLocalCartState] = useState(getCartState);
  const [totalQuantity, setTotalQuantity] = useState(null);

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
      setTotalQuantity(res?.cart?.totalQuantity);
    });
  }, [cartState]);

  return (
    <div className="header__wrapper border-b">
      <div className="header__container flex items-center justify-between container py-4">
        <div className="header__logo">
          <a href="/">
            <Icon icon="logo" />
          </a>
        </div>
        <div className="header__navigation">
          <nav>
            <ul className="flex">
              {menu.map((item: any) => (
                <li>
                  <a href={item.url} className="py-4 px-6">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="header__icons">
          <button className="p-2">
            <Icon icon="search" />
          </button>
          <button className="p-2">
            <Icon icon="account" />
          </button>
          <a href="/cart" className="p-2 inline-flex">
            <Icon icon="cart" />
            {totalQuantity && <span>{totalQuantity}</span>}
          </a>
        </div>
      </div>
    </div>
  );
};
