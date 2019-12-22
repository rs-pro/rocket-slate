import React from "react";
import classNames from "classnames";

const Button = React.forwardRef((props, ref) => {
  const { active, children, className, ...rest } = props;

  const cl = classNames("editor__button", className, {
    "editor__button--active": active
  });
  return (
    <a tabIndex="-1" ref={ref} className={cl} {...rest}>
      {children}
    </a>
  );
});

export default Button;
