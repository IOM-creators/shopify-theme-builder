import { h, ComponentChildren } from "preact";
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

type SliderProps = {
  params?: any;
  children?: ComponentChildren;
};
export const Slider = ({ params, children }: SliderProps) => {
  const swiperContainer = useSwiper(params);
  return (
    <div>
      <div ref={swiperContainer} className="swiper-container">
        <div className="swiper-wrapper">{children}</div>
      </div>
    </div>
  );
};
