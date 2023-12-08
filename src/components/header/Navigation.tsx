import { h, FunctionalComponent } from "preact";

interface INavigation {
  menu: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ menu }) => {
  return (
    <div class="navigation">
      {menu.map((item: any) => (
        <li>
          {item.title} - {item.url}
        </li>
      ))}
    </div>
  );
};
