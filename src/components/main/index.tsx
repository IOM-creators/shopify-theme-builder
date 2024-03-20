import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export const Main = ({ data, element }) => {
  const html = document.createElement("div");
  html.innerHTML = data.content;
  const uniq = (value, index, self) => self.indexOf(value) === index;
  const sections = html.querySelectorAll("[data-section-main]");
  const ids = [...sections]
    .map((section) => section.dataset.sectionMain)
    .filter(uniq);

  const [Components, setComponent] = useState<any[]>([]);

  useEffect(() => {
    ids.forEach(async (name) => {
      const module = await import(
        /* webpackChunkName: "[request]" */ `../${name}/index.tsx`
      );
      const modules = [...sections].filter(
        (section) => section.dataset.sectionMain === name
      );
      modules.map((elem) => {
        const dataEl = elem.querySelector("[data-section-data]");
        const data = dataEl ? JSON.parse(dataEl.textContent) : {};
        const Component = module.default;
        Components.push(<Component {...data} />);
        setComponent([...Components]);
      });
    });
  }, []);
  return <main>{Components}</main>;
};
