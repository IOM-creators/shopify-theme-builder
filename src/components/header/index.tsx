import { h, render } from "preact";
import { Navigation } from "./Navigation";

export const Header = ({ data }) => {
  return (
    <header>
      <Navigation menu={data.menu} />
    </header>
  );
};
