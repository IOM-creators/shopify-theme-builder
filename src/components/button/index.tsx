import { ComponentChildren, FunctionalComponent, h } from "preact";
import cn from "classnames";
import { Icon } from "../icon";

interface IButton {
  type?: string;
  className?: string;
  classIcon?: string;
  icon?: string;
  onlyIcon?: boolean;
  children?: ComponentChildren;
  loading?: boolean;
  onClick?: (event: MouseEvent) => void;
}
export const Button: FunctionalComponent<IButton> = ({
  type = "button",
  className,
  icon = "",
  children,
  onlyIcon,
  classIcon,
  loading,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={cn(className, { loading })}
      onClick={onClick}
    >
      {onlyIcon ? <Icon icon={icon} className={classIcon} /> : children}
    </button>
  );
};
