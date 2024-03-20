import { h, ComponentChildren, FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import Swiper from "swiper";

const useSwiper = (props = {}) => {
  const swiperContainer = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    swiperInstance.current = new Swiper(swiperContainer.current!, {
      ...props,
    });
    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
      }
    };
  }, [props]);
  return swiperContainer;
};

interface ISlider {
  params?: any;
  children?: ComponentChildren;
}
export const Slider: FunctionalComponent<ISlider> = ({ params, children }) => {
  const swiperContainer = useSwiper(params);
  return (
    <div className="slider">
      <div ref={swiperContainer} className="swiper-container">
        <div className="swiper-wrapper">{children}</div>
      </div>
    </div>
  );
};
