// globalState.js
let popupState = false;
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
