import { h, render } from "preact";
import { Navigation } from "./Navigation";

export const Footer = ({ data }) => {
  return (
    <footer>
      <Navigation menu={data.menu} />
    </footer>
  );
};
