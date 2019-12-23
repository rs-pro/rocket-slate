import React from "react"

const MarkButton = React.forwardRef((props, ref) => {
  const { type, icon, hasMark, onClickMark, ...rest } = props;
  const isActive = hasMark(type);
  return (
    <Button
      ref={ref}
      active={isActive}
      onMouseDown={event => onClickMark(event, type)}
      {...rest}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
});

export default MarkButton
