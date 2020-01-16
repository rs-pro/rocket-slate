import React from "react";
import classNames from "classnames";

type buttonProps = {
  active: boolean;
  children: any;
  className: string | null;
}

const Button = React.forwardRef((props: buttonProps, ref: any) => {
  const { active, children, className, ...rest } = props;

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
