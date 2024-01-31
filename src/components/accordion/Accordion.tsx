import { h, FunctionalComponent, ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import cn from "classnames";
import { Icon } from "../icon";

interface IAccordionItem {
  children: ComponentChildren;
  title?: string;
  className?: string;
  classTitle?: string;
  classContent?: string;
}

export const AccordionItem: FunctionalComponent<IAccordionItem> = ({
  children,
  title,
  className,
  classTitle,
  classContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="accordion-item">
      <h4
        className={cn(
          {},
          classTitle,
          "cursor-pointer flex items-center justify-between"
        )}
        onClick={toggleAccordion}
      >
        {title}
        <Icon
          icon="arrow-down"
          className={cn({ "scale-[-1]": isOpen }, "w-4 transition-all")}
        />
      </h4>
      <div
        className={cn(
          { "max-h-screen pb-8": isOpen, "max-h-0": !isOpen },
          classContent,
          "accordion-item__content  transition-all overflow-hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
};
