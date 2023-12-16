import { h, render } from "preact";
import { Slider } from "./Slider";
import { Slide } from "./Slide";
import "./styles.scss";

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
            <div className="img-wrapper">
              <img src={slide.featured_image} alt="" width={200} height={200} />
            </div>
            <h5>{slide.title}</h5>
          </Slide>
        ))}
    </Slider>,
    element
  );
};
