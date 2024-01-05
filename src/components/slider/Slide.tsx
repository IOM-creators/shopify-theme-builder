import { h, ComponentChildren, FunctionalComponent } from "preact";
import cn from "classnames";

interface ISlide {
  params?: any;
  className?: string;
  children?: ComponentChildren;
}
export const Slide: FunctionalComponent<ISlide> = ({
  params,
  children,
  className,
}) => {
  return (
    <div className={cn({ className }, "swiper-slide")} {...params}>
      {children}
    </div>
  );
};
