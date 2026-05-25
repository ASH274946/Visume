import React from "react";

const colorClasses = {
  primary: "peer-checked:border-primary peer-checked:after:bg-primary",
  tertiary: "peer-checked:border-tertiary peer-checked:after:bg-tertiary",
  secondary: "peer-checked:border-secondary peer-checked:after:bg-secondary",
};

const Toggle = ({ checked, onChange, name, className = "", activeColor = "primary" }) => {
  const activeClass = colorClasses[activeColor] || colorClasses.primary;

  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className={`w-12 h-7 border-[3px] border-text-muted rounded-full peer-focus:outline-none transition-colors relative after:content-[''] after:absolute after:top-1 after:left-1 after:h-3.5 after:w-3.5 after:bg-text-muted after:rounded-full after:transition-transform peer-checked:after:translate-x-5 ${activeClass}`}></div>
    </label>
  );
};

export default Toggle;
