import { h } from "preact";
export const Navigation = ({ menu }) => {
  return (
    <div class="navigation">
      {menu.map((item) => (
        <li>{item.title}</li>
      ))}
    </div>
  );
};
