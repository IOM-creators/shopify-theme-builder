import { h, ComponentChildren } from "preact";

interface IPopupState {
  state: false;
  content?: ComponentChildren;
  title?: string;
}

let popupState: IPopupState = {
  state: false,
  content: "",
  title: "",
};
let popupStateCallback: any = null;

export const getPopupState = () => popupState;

export const setPopupState = (value) => {
  popupState = value;
  if (popupStateCallback) {
    popupStateCallback(value);
  }
};

export const subscribeToPopupState = (callback) => {
  popupStateCallback = callback;
};
