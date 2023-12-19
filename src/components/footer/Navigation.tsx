import { h, FunctionalComponent } from "preact";
import { Icon } from "../icon";
interface INavigation {
  menu: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ menu }) => {
  return (
    <div className="footer__wrapper border-t">
      <div className="footer__container flex items-center justify-center container py-4">
        {/* <div className="footer__logo">
          <Icon icon="logo" />
        </div> */}
        <div className="footer__navigartion">
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
      </div>
    </div>
  );
};
