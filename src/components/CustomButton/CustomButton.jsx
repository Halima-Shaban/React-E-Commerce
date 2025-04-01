import React from "react";
import PropTypes from "prop-types";
import "./CustomButton.scss"; // You can style the button as needed here.

const CustomButton = ({
  label,
  onClick,
  icon: Icon, // Allows passing icons
  className = "",
  disabled = false,
  ariaLabel,
}) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {Icon && <Icon size={20} />} {/* Render the icon if passed */}
      {label}
    </button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired, // Text for the button
  onClick: PropTypes.func.isRequired, // Action to perform on click
  icon: PropTypes.elementType, // Optional icon to show
  className: PropTypes.string, // Additional CSS class
  disabled: PropTypes.bool, // Disable button
  ariaLabel: PropTypes.string, // Accessibility label
};

export default CustomButton;
