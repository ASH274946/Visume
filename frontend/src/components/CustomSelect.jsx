import React, { useState, useEffect, useRef } from 'react';

const CustomSelect = ({ value, onChange, name, options, placeholder = "Select an option", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-surface-container border border-border-input rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all flex items-center justify-between"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <span className={`material-symbols-outlined text-text-muted transition-transform shrink-0 text-lg ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-surface-container-highest border border-outline-variant rounded-xl shadow-xl overflow-hidden py-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                if (onChange) {
                  onChange({ target: { name, type: 'select', value: opt.value } });
                }
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 hover:bg-primary-container/20 transition-colors text-body-sm ${value === opt.value ? 'bg-primary-container/10 text-primary-container font-bold' : 'text-text-primary'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
