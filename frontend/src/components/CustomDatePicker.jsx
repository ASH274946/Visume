import React, { useState, useEffect, useRef } from 'react';

const CustomDatePicker = ({ value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState('bottom');
  const [viewMode, setViewMode] = useState('days'); // 'days' | 'months' | 'years'
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        setCurrentDate(parsedDate);
      }
    }
  }, [value]);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const popupHeight = popupRef.current ? popupRef.current.offsetHeight : 350; // Approximate height if ref not ready
      
      if (spaceBelow < popupHeight && rect.top > popupHeight) {
        setPlacement('top');
      } else {
        setPlacement('bottom');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    onChange({ target: { name, type: 'text', value: `${yyyy}-${mm}-${dd}` } });
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange({ target: { name, type: 'text', value: '' } });
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    onChange({ target: { name, type: 'text', value: `${yyyy}-${mm}-${dd}` } });
    setIsOpen(false);
  };

  const isSelected = (day) => {
    if (!value) return false;
    const [y, m, d] = value.split('-');
    return parseInt(d) === day && parseInt(m) - 1 === currentDate.getMonth() && parseInt(y) === currentDate.getFullYear();
  };
  
  const formattedValue = value ? value.split('-').reverse().join('-') : 'Select Date';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-surface-container border border-border-input rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all flex items-center justify-between"
      >
        <span>{formattedValue}</span>
        <span className="material-symbols-outlined text-text-muted shrink-0 text-lg">calendar_today</span>
      </button>

      {isOpen && (
        <div 
          ref={popupRef}
          className={`absolute z-50 left-0 p-5 bg-surface-container-highest border border-outline-variant rounded-2xl shadow-xl w-[300px] ${placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button 
              type="button" 
              onClick={() => {
                if (viewMode === 'days') handlePrevMonth();
                if (viewMode === 'months') setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
                if (viewMode === 'years') setCurrentDate(new Date(currentDate.getFullYear() - 20, currentDate.getMonth(), 1));
              }} 
              className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant/30 hover:bg-surface-bright flex items-center justify-center transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-sm text-text-primary shrink-0">chevron_left</span>
            </button>
            <div className="flex gap-2 font-headline-sm font-bold text-text-primary">
              <span 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => setViewMode(viewMode === 'months' ? 'days' : 'months')}
              >
                {monthNames[currentDate.getMonth()]}
              </span>
              <span 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => setViewMode(viewMode === 'years' ? 'days' : 'years')}
              >
                {currentDate.getFullYear()}
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => {
                if (viewMode === 'days') handleNextMonth();
                if (viewMode === 'months') setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
                if (viewMode === 'years') setCurrentDate(new Date(currentDate.getFullYear() + 20, currentDate.getMonth(), 1));
              }} 
              className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant/30 hover:bg-surface-bright flex items-center justify-center transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-sm text-text-primary shrink-0">chevron_right</span>
            </button>
          </div>

          {viewMode === 'days' && (
            <>
              {/* Days Header */}
              <div className="grid grid-cols-7 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-label-md text-text-muted font-bold py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-2">
                {emptyDays.map(i => <div key={`empty-${i}`} />)}
                {days.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-body-sm transition-all
                      ${isSelected(day) ? 'bg-primary text-white font-bold' : 'text-text-primary hover:bg-surface-bright hover:font-bold'}
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </>
          )}

          {viewMode === 'months' && (
            <div className="grid grid-cols-3 gap-3 py-2">
              {monthNames.map((month, idx) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => {
                    setCurrentDate(new Date(currentDate.getFullYear(), idx, 1));
                    setViewMode('days');
                  }}
                  className={`py-2 rounded-lg text-body-sm transition-all ${
                    currentDate.getMonth() === idx ? 'bg-primary text-white font-bold' : 'text-text-primary hover:bg-surface-bright'
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          )}

          {viewMode === 'years' && (
            <div className="grid grid-cols-4 gap-2 py-2 max-h-48 overflow-y-auto custom-scrollbar">
              {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - 100 + i).map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                    setViewMode('days');
                  }}
                  className={`py-1.5 rounded-lg text-body-sm transition-all ${
                    currentDate.getFullYear() === year ? 'bg-primary text-white font-bold' : 'text-text-primary hover:bg-surface-bright'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-border-input mt-4 pt-4 flex items-center justify-between">
            <button type="button" onClick={handleClear} className="px-5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-label-md hover:bg-primary/20 transition-colors">
              Clear
            </button>
            <button type="button" onClick={handleToday} className="px-5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-label-md hover:bg-primary/20 transition-colors">
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
