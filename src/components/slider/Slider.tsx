import { h } from "preact";

type SliderProps = {
  slides: any;
};
export const Slider = ({ slides }: SliderProps) => {
  return (
    <div class="slider">
      {slides && slides.map((slide: any) => <li>{slide.title}</li>)}
    </div>
  );
};
