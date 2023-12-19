import { ComponentChildren, FunctionalComponent, h } from "preact";
import cn from "classname";
import { Icon } from "../icon";
import {
  getPopupState,
  setPopupState,
  subscribeToPopupState,
} from "../../state";
import { useEffect, useState } from "preact/hooks";

interface IPopup {
  params?: any;
  className?: string;
  title?: string;
  children?: ComponentChildren;
}
export const Popup: FunctionalComponent<IPopup> = ({
  children,
  className,
  title,
  params,
}) => {
  const [popupState, setLocalPopupState] = useState(getPopupState);

  useEffect(() => {
    const callback = (newPopupState) => {
      setLocalPopupState(newPopupState);
    };
    subscribeToPopupState(callback);
    return () => {
      subscribeToPopupState(null);
    };
  }, []);

  const closePopup = () => {
    setPopupState(false);
  };

  return (
    <div
      className={cn(
        {
          "visible opacity-100 transition duration-300": popupState,
          "opacity-0 invisible": !popupState,
          className,
        },
        "popup fixed top-0 left-0 w-full h-full flex items-center justify-center"
      )}
      {...params}
    >
      <div
        className="fixed top-0 left-0 w-full h-full bg-black-05"
        onClick={closePopup}
      ></div>
      <div className="relative popup-wrapper w-[60%] h-[70%] bg-white">
        <div className="flex items-center justify-center popup-header text-center p-5">
          <h2 className="text-2xl">{title}Title</h2>
          <button className="absolute right-4" onClick={closePopup}>
            <Icon icon="close" />
          </button>
        </div>
        <div className="popup-conteiner">{children}</div>
      </div>
    </div>
  );
};
