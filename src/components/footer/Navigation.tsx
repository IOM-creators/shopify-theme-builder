import { h, FunctionalComponent } from "preact";
interface INavigation {
  menu: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ menu }) => {
  return (
    <div class="navigation">
      {menu && menu.map((item: any) => <li>{item.title}</li>)}
    </div>
  );
};
