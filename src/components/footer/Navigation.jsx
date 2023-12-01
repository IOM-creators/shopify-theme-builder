import { h } from "preact";
export const Navigation = ({ menu }) => {
  return (
    <div class="havigation">
      {menu.map((item) => (
        <li>{item.title}</li>
      ))}
    </div>
  );
};
