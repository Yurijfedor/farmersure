import React from "react";
import PropTypes from "prop-types";

import { ButtonStyled } from "./Button.styled";

export const Button = ({
  children,
  variant = "",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
}) => {
  return (
    <ButtonStyled
      data-testid="test-button"
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["default", "filterBtn", "formBtn"]),
  type: PropTypes.oneOf(["button", "submit"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onClick: PropTypes.func,
};
