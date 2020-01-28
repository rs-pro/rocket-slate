import React, {ButtonHTMLAttributes} from "react";
import classNames from "classnames";

type IButtonProps = ButtonHTMLAttributes<
  HTMLButtonElement | HTMLAnchorElement
> & {
  active: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Button = React.forwardRef<any, IButtonProps>((props, ref) => {
  const { children, active, className, ...rest } = props;

  const cl = classNames("editor__button", className, {
    "editor__button--active": active
  });
  return (
    <a tabIndex={-1} ref={ref} className={cl} {...rest}>
      {children}
    </a>
  );
});

export default Button;
