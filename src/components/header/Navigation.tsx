import { h, FunctionalComponent } from "preact";
import { Icon } from "../icon";
import { setPopupState } from "../../state";
interface INavigation {
  menu: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ menu }) => {
  const openPopup = (title) => {
    setPopupState({
      state: true,
      content: <div>Popup content</div>,
      title,
    });
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
          <button className="p-2">
            <Icon icon="cart" />
          </button>
        </div>
      </div>
    </div>
  );
};
