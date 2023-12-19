import { h, FunctionalComponent } from "preact";
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
    <div class="navigation">
      {menu.map((item: any) => (
        <li onClick={() => openPopup(item.title)}>{item.title}</li>
      ))}
    </div>
  );
};
