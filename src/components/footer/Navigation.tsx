import { h, FunctionalComponent } from "preact";
import { Icon } from "../icon";
interface INavigation {
  data: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ data }) => {
  return (
    <div
      id={data.sectionId}
      className="footer__wrapper border-t shopify-section"
    >
      <div className="footer__container flex items-center justify-center container py-4">
        {/* <div className="footer__logo">
          <Icon icon="logo" />
        </div> */}
        <div className="footer__navigartion">
          <nav>
            <ul className="flex">
              {data?.menu &&
                data.menu.map((item: any) => (
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
