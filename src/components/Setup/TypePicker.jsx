import React from "react";

const TypePicker = ({ selectedType, onChange }) => {
  const setupOptions = [
    { label: "All", value: "all" },
    { label: "Default", value: "default" },
    { label: "Force", value: "force" },
    { label: "Execute", value: "execute" },
    { label: "Eco", value: "eco" },
    { label: "Counter", value: "anti-eco" },
    { label: "Pistol", value: "pistol" },
  ];

  return (
    <div className="side-picker type-picker">
      {setupOptions.map((option) => (
        <div
          key={option.value}
          className={`side-picker__tab type-picker__tab ${selectedType === option.value ? "side-picker__tab--active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default TypePicker;
