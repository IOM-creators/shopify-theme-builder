import { h } from "preact";
type NavigationProps = {
  menu: any;
};
export const Navigation = ({ menu }: NavigationProps) => {
  return (
    <div class="havigation">
      {menu && menu.map((item: any) => <li>{item.title}</li>)}
    </div>
  );
};
