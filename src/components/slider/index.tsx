import { h, render } from "preact";
import { Slider } from "./Slider";
import "./styles.scss";

export default (element, data) => {
  const sliderParams = {
    centeredSlides: true,
    centeredSlidesBounds: true,
    loop: true,
    slidesPerView: 3,
  };
  const init = () => {
    render(
      <Slider params={sliderParams}>
        {data.products &&
          data.products.map((slide: any) => (
            <div className="swiper-slide">
              <div className="img-wrapper">
                <img
                  src={slide.featured_image}
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <h5>{slide.title}</h5>
            </div>
          ))}
      </Slider>,
      element
    );
  };
  init();
};
