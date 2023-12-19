import { h, FunctionalComponent } from "preact";
import { setPopupState } from "../../state";
interface INavigation {
  menu: any;
}
export const Navigation: FunctionalComponent<INavigation> = ({ menu }) => {
  const openPopup = () => {
    setPopupState(true);
  };
  return (
    <div class="navigation">
      {menu.map((item: any) => (
        <li onClick={openPopup}>{item.title}</li>
      ))}
    </div>
  );
};
