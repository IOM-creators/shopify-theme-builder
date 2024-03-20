import { FunctionalComponent, h } from "preact";
import cn from "classnames";
import { Icon } from "../icon";
import { useGlobalState } from "../../GlobalStateContext";

interface IPopup {
  params?: any;
  className?: string;
  data?: any;
  element?: any;
}
export const Popup: FunctionalComponent<IPopup> = ({ className, params }) => {
  const { globalState, setPopupState } = useGlobalState();

  const closePopup = () => {
    setPopupState({ state: !globalState.popupState.state });
  };

  return (
    <div
      className={cn(
        "popup fixed top-0 left-0 w-full h-full flex items-center justify-center",
        {
          "visible opacity-100 transition duration-300":
            globalState.popupState.state,
          "opacity-0 invisible": !globalState.popupState.state,
          className,
        }
      )}
      {...params}
    >
      <div
        className="fixed top-0 left-0 w-full h-full bg-black-05"
        onClick={closePopup}
      ></div>
      <div className="relative popup-wrapper w-[60%] h-[70%] bg-white">
        <div className="flex items-center justify-center popup-header text-center p-5">
          <h2 className="text-2xl">{globalState.popupState.title}</h2>
          <button className="absolute right-4" onClick={closePopup}>
            <Icon icon="close" />
          </button>
        </div>
        <div className="popup-conteiner px-6 py-10">
          {globalState.popupState.content}
        </div>
      </div>
    </div>
  );
};
