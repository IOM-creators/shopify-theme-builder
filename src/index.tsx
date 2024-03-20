import "./index.scss";
import { h, render } from "preact";
import { GlobalStateProvider } from "./GlobalStateContext";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import { MiniCart } from "./components/mini-cart";
import { Popup } from "./components/popup";

function initProject() {
  const getData = (id) => {
    const element = document.querySelector(`[data-section="${id}"]`);
    const dataEl = element && element.querySelector("[data-section-data]");
    const data = dataEl ? JSON.parse(dataEl.textContent) : {};
    return {
      data,
      element,
    };
  };

  render(
    <GlobalStateProvider>
      <Header {...getData("header")} />
      <Main {...getData("main")} />
      <MiniCart {...getData("mini-cart")} />
      <Popup {...getData("mini-cart")} />
      <Footer {...getData("footer")} />
    </GlobalStateProvider>,
    document.body
  );
}

if (window?.Shopify && window.Shopify.designMode) {
  window.addEventListener("shopify:inspector:activate", initProject);
  window.addEventListener("shopify:section:load", initProject);
} else {
  document.addEventListener("DOMContentLoaded", initProject);
}
