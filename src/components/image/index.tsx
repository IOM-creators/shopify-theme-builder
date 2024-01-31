import { FunctionalComponent, h } from "preact";
import cn from "classnames";

interface IImage {
  className?: string;
  image: {
    src: string;
    altText: string;
  };
}
export const Image: FunctionalComponent<IImage> = ({ className, image }) => {
  const calculateSrcset = () => {
    const src = image.src;
    const smallSrc = `${src.replace(/\.\w+$/, "-small$&") + "&width=300"} 300w`;
    const mediumSrc = `${
      src.replace(/\.\w+$/, "-medium$&") + "&width=600"
    } 600w`;
    const largeSrc = `${
      src.replace(/\.\w+$/, "-large$&") + "&width=1200"
    } 1200w`;
    return `${smallSrc}, ${mediumSrc}, ${largeSrc}`;
  };
  const calculateSizes = () =>
    "(max-width: 320px) 280px, (max-width: 480px) 440px, 800px";
  return (
    <div className={cn(className, "img-wrapper")}>
      <img
        srcset={calculateSrcset()}
        sizes={calculateSizes()}
        src={image.src}
        alt={image.altText}
        loading="lazy"
        width="1100"
      />
    </div>
  );
};
