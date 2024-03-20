import "./index.scss";
import { h, render } from "preact";
import { GlobalStateProvider } from "./GlobalStateContext";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import { MiniCart } from "./components/mini-cart";

function initProject() {
  const uniq = (value, index, self) => self.indexOf(value) === index;
  const sections: any = document.querySelectorAll("[data-section]");
  const sectionNames = [...sections]
    .map((section) => section.dataset.section)
    .filter(uniq);

  const getData = (id) => {
    const element = document.querySelector(`[data-section="${id}"]`);
    const dataEl = element.querySelector("[data-section-data]");
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
      <Footer {...getData("footer")} />
      <MiniCart {...getData("mini-cart")} />
    </GlobalStateProvider>,
    document.body
  );
}

document.addEventListener("DOMContentLoaded", initProject);

if (window?.Shopify && window.Shopify.designMode) {
  window.addEventListener("shopify:section:load", initProject);
}
