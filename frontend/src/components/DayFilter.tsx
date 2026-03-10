import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface DayFilterProps {
  onDaySelect: (date: string | null) => void;
  selectedDay?: string | null;
}

export const DayFilter: React.FC<DayFilterProps> = ({ onDaySelect, selectedDay }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDateForWeekday = (weekday: string): string => {
    const today = new Date();
    const dayIndex = WEEKDAYS.indexOf(weekday);
    const currentDayIndex = today.getDay();
    
    // Adjust for Sunday being 0 in getDay()
    const adjustedCurrentDay = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    const adjustedTargetDay = dayIndex;
    
    let daysAhead = adjustedTargetDay - adjustedCurrentDay;
    if (daysAhead <= 0) {
      daysAhead += 7; // Next week
    }
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysAhead);
    
    return targetDate.toISOString().split('T')[0];
  };

  const handleDaySelect = (weekday: string) => {
    const date = getDateForWeekday(weekday);
    onDaySelect(date);
    setIsOpen(false);
  };

  const handleClear = () => {
    onDaySelect(null);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
      >
        📅 {selectedDay ? 'Filtered by Day' : 'Filter by Day'}
        <ChevronDown size={18} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="p-2">
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className="w-full text-left px-4 py-2 hover:bg-primary-100 rounded transition text-gray-800"
              >
                {day}
              </button>
            ))}
            {selectedDay && (
              <>
                <div className="border-t my-2" />
                <button
                  onClick={handleClear}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition text-gray-800 text-sm"
                >
                  Clear Filter
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
