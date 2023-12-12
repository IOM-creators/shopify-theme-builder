import { h, ComponentChildren } from "preact";
import cn from "classname";

type SliderProps = {
  params?: any;
  className?: string;
  children?: ComponentChildren;
};
export const Slide = ({ params, children, className }: SliderProps) => {
  return (
    <div className={cn({ className }, "swiper-slide")} {...params}>
      {children}
    </div>
  );
};
