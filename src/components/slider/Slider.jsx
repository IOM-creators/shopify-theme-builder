import { h } from "preact";
export const Slider = ({ slides }) => {
  return (
    <div class="slider">
      {slides && slides.map((slide) => <li>{slide.title} {slider.url}</li>)}
    </div>
  );
};

