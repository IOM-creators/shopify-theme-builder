import { h } from "preact";
const Navigation = ({ menu }) => {
  return (
    <div class="havigation">
      {menu.map((item) => (
        <li>{item.title}</li>
      ))}
    </div>
  );
};

export default Navigation;
