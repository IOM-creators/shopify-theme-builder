import { Fragment, FunctionalComponent, h } from "preact";
import cn from "classname";

interface IImage {
  className?: string;
  image: {
    src: string;
    altText: string;
  };
}
export const Image: FunctionalComponent<IImage> = ({ className, image }) => {
  return (
    <div className={cn(className, "img-wrapper")}>
      <img src={image.src} alt={image.altText} />
    </div>
  );
};
