import { useState } from 'react';  
import { CalendarIcon, XMarkIcon } from '@heroicons/react/20/solid';

function DatePicker({
  default_date,
  align = 'left',
  defaultYear,
  defaultMonth,
  setDate,
  dateFuture,
  datePast,
  dateRangeStart,
  dateRangeEnd,
  yearRange = { before: 0, after: 5 },  
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(defaultYear || null);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth || null);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const defaultDate = default_date ? new Date(default_date) : new Date();
  const currentYear = defaultDate.getFullYear();
  
  // Generate year range based on yearRange prop
  const years = Array.from(
    { length: yearRange.before + yearRange.after + 1 }, 
    (_, i) => currentYear - yearRange.before + i
  ).sort((a, b) => a - b); // Ensure years are sorted

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const rangeStart = dateRangeStart ? new Date(dateRangeStart) : null;
  const rangeEnd = dateRangeEnd ? new Date(dateRangeEnd) : null;

  const isYearDisabled = (year) => {
    if (dateFuture && year < today.getFullYear()) return true;
    if (datePast && year > today.getFullYear()) return true;
    if (rangeStart && year < rangeStart.getFullYear()) return true;
    if (rangeEnd && year > rangeEnd.getFullYear()) return true;
    return false;
  };

  const isMonthDisabled = (year, month) => {
    const monthDate = new Date(year, month, 1);
    if (dateFuture && monthDate < today) return true;
    if (datePast && monthDate > today) return true;
    if (rangeStart) {
      const startYear = rangeStart.getFullYear();
      const startMonth = rangeStart.getMonth();
      if (year < startYear || (year === startYear && month < startMonth)) return true;
    }
    if (rangeEnd) {
      const endYear = rangeEnd.getFullYear();
      const endMonth = rangeEnd.getMonth();
      if (year > endYear || (year === endYear && month > endMonth)) return true;
    }
    return false;
  };

  const isDateDisabled = (year, month, date) => {
    const currentDate = new Date(year, month, date);
    currentDate.setHours(0, 0, 0, 0);
    
    if (dateFuture && currentDate < today) return true;
    if (datePast && currentDate > today) return true;
    if (rangeStart && currentDate < rangeStart) return true;
    if (rangeEnd && currentDate > rangeEnd) return true;
    return false;
  };

  const showDatePickerHandler = () => {
    setSelectedDate(null);
    if (!defaultYear) setSelectedYear(null);
    if (!defaultMonth) setSelectedMonth(null);
    setShowDatePicker(true);
  };

  return (
    <div className="relative inline-block">
      <button
        className='border-2 border-gray-300 px-3 py-1 rounded-md flex flex-row gap-1 items-center'
        onClick={showDatePickerHandler}
      >
        <CalendarIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        <span className='text-gray-900 text-sm'>Select Date</span>
      </button>

      {showDatePicker && (
        <div className={`absolute ${align === 'right' ? '-right-2' : 'left-0'} z-10 mt-2`}>
          <div className='w-96 bg-white rounded-md shadow-lg p-3'>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowDatePicker(false)}
                className='p-2 border-2 border-gray-300 bg-black text-white rounded-md hover:bg-gray-700'
              >
                <XMarkIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              </button>
            </div>

            <div className='mt-4'>
              {selectedYear !== null && (
                <div className='w-full flex'>
                  <button
                    onClick={() => setSelectedYear(null)}
                    className={`p-2 border-2 ${selectedYear !== null ? 'border-blue-400 my-1' : 'border-gray-300'} rounded-md flex-1`}
                  >
                    {selectedYear}
                  </button>
                </div>
              )}

              {selectedMonth !== null && (
                <div className='w-full flex'>
                  <button
                    onClick={() => setSelectedMonth(null)}
                    className={`p-2 border-2 ${selectedMonth !== null ? 'border-blue-400 my-1' : 'border-gray-300'} rounded-md flex-1`}
                  >
                    {months[selectedMonth]}
                  </button>
                </div>
              )}

              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className={`p-2 border-2 ${selectedDate !== null ? 'border-blue-400 my-1' : 'border-gray-300'} w-full rounded-md flex-1`}
                >
                  {selectedDate}
                </button>
              )}
            </div>

            {selectedYear === null && (
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Select Year</h3>
                <div className='grid grid-cols-3 gap-2 mt-2'>
                  {years.map(year => {
                    const disabled = isYearDisabled(year);
                    return (
                      <button
                        key={year}
                        onClick={() => !disabled && setSelectedYear(year)}
                        className={`p-2 border-2 ${
                          disabled 
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'border-gray-300 hover:bg-gray-100'
                        } rounded-md`}
                        disabled={disabled}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedYear !== null && selectedMonth === null && (
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Select Month</h3>
                <div className='grid grid-cols-3 gap-2 mt-2'>
                  {months.map((month, index) => {
                    const disabled = isMonthDisabled(selectedYear, index);
                    return (
                      <button
                        key={month}
                        onClick={() => !disabled && setSelectedMonth(index)}
                        className={`p-2 border-2 ${
                          disabled 
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'border-gray-300 hover:bg-gray-100'
                        } rounded-md`}
                        disabled={disabled}
                      >
                        {month}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedYear !== null && selectedMonth !== null && selectedDate === null && (
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Select Date</h3>
                <div className='grid grid-cols-7 gap-2 mt-2'>
                  {Array.from({ length: daysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1).map(date => {
                    const disabled = isDateDisabled(selectedYear, selectedMonth, date);
                    return (
                      <button
                        key={date}
                        onClick={() => !disabled && setSelectedDate(date)}
                        className={`p-2 border-2 ${
                          disabled 
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'border-gray-300 hover:bg-gray-100'
                        } rounded-md`}
                        disabled={disabled}
                      >
                        {date}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedYear !== null && selectedMonth !== null && selectedDate && (
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>
                  Selected: {selectedDate} - {months[selectedMonth]} - {selectedYear}
                </h3>
                <button
                  onClick={() => {
                    setShowDatePicker(false);
                    if (setDate) setDate(new Date(selectedYear, selectedMonth, selectedDate));
                  }}
                  className='p-2 mt-4 border-2 border-gray-300 bg-black text-white rounded-md hover:bg-gray-700'
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;