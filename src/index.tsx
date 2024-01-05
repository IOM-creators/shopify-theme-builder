import "./index.scss";

function initProject() {
  const uniq = (value, index, self) => self.indexOf(value) === index;
  const sections: any = document.querySelectorAll("[data-section]");
  const sectionNames = [...sections]
    .map((section) => section.dataset.section)
    .filter(uniq);

  sectionNames.forEach((name) => {
    import(/* webpackChunkName: "[request]" */ `./components/${name}/index.tsx`)
      .then((m) => {
        const module = m.default;
        const modules = [...sections].filter(
          (section) => section.dataset.section === name
        );
        modules.forEach((element) => {
          const dataEl = element.querySelector("[data-section-data]");
          const data = dataEl ? JSON.parse(dataEl.textContent) : {};
          module(element, { ...data });
        });
      })
      .catch(console.error);
  });
}

initProject();
document.addEventListener("DOMContentLoaded", function () {
  // Your code here will execute after the HTML document has been fully loaded and parsed
  console.log("DOM content has been loaded!");
});
if (window?.Shopify && window.Shopify.designMode) {
  window.addEventListener("shopify:section:load", () => {
    document.body.classList.add("loading");
    initProject();
    setTimeout(() => {
      document.body.classList.remove("loading");
    }, 200);
  });
}
