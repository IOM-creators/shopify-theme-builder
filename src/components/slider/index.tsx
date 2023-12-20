import { h, render } from "preact";
import { Image } from "../image";
import { Slider } from "./Slider";
import { Slide } from "./Slide";

export default (element, data) => {
  const sliderParams = {
    centeredSlides: true,
    centeredSlidesBounds: true,
    loop: true,
    slidesPerView: 3,
  };
  render(
    <Slider params={sliderParams}>
      {data.products &&
        data.products.map((slide: any) => (
          <Slide>
            <Image image={slide.featured_image} />
            <h5>{slide.title}</h5>
          </Slide>
        ))}
    </Slider>,
    element
  );
};
