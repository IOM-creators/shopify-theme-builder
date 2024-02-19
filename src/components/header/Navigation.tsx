import { h, FunctionalComponent } from "preact";
import { Icon } from "../icon";
import { getCart } from "../../storefront/graphql/send-request";
import {
  getCartState,
  getMiniCartState,
  setMiniCartState,
  subscribeToCartState,
  subscribeToMiniCartState,
} from "../../state/cart";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../button";
interface INavigation {
  menu: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ menu }) => {
  const [cartState, setLocalCartState] = useState(getCartState);
  const [totalQuantity, setTotalQuantity] = useState(null);
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
      setTotalQuantity(res?.cart?.totalQuantity);
    });
  }, [cartState]);

  const handleMinitCart = () => {
    setMiniCartState(!cartMiniState);
  };

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
          <Button onClick={handleMinitCart} className="p-2 inline-flex">
            <Icon icon="cart" />
            {totalQuantity && <span>{totalQuantity}</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
