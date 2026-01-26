import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Step3ProposeDateAndTime({
  data,
  onNext,
  onBack,
}) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customHour, setCustomHour] = useState('');
  const [customMinute, setCustomMinute] = useState('');
  const [customPeriod, setCustomPeriod] = useState('AM');
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);
  const [proposedSlots, setProposedSlots] = useState(
    data?.selectedDates || []
  );

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM',
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isPastMonth = (date) => {
    const today = new Date();
    return date.getFullYear() < today.getFullYear() || 
           (date.getFullYear() === today.getFullYear() && date.getMonth() < today.getMonth());
  };

  const isPastDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (!isPastMonth(newMonth)) {
      setCurrentMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleTimeSelect = (time) => {
    if (time === 'custom') {
      setShowCustomTimeInput(true);
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
      setShowCustomTimeInput(false);
    }
  };

  const handleAddTimeSlot = () => {
    if (selectedDate && selectedTime) {
      const newSlot = {
        date: selectedDate,
        time: selectedTime,
      };

      setProposedSlots([...proposedSlots, newSlot]);
      setSelectedTime(null);
      setCustomHour('');
      setCustomMinute('');
      setCustomPeriod('AM');
      setShowCustomTimeInput(false);
    }
  };

  const handleCustomTimeSubmit = () => {
    if (customHour && customMinute && selectedDate) {
      const customTime = `${customHour}:${customMinute} ${customPeriod}`;
      const newSlot = {
        date: selectedDate,
        time: customTime,
      };

      setProposedSlots([...proposedSlots, newSlot]);
      setSelectedTime(null);
      setCustomHour('');
      setCustomMinute('');
      setCustomPeriod('AM');
      setShowCustomTimeInput(false);
    }
  };

  const handleRemoveSlot = (index) => {
    setProposedSlots(proposedSlots.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (proposedSlots.length > 0) {
      onNext({ selectedDates: proposedSlots });
    }
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const formatDateForDisplay = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderCalendarDays = () => {
    const days = [];
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    dayLabels.forEach((label) => {
      days.push(
        <div key={`label-${label}`} className="text-center text-sm font-semibold text-gray-600 py-2">
          {label}
        </div>
      );
    });

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      const isToday = dateStr === todayStr;
      const isPast = isPastDate(dateStr);

      days.push(
        <button
          key={day}
          onClick={() => !isPast && setSelectedDate(dateStr)}
          disabled={isPast}
          className={`aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
            isPast
              ? 'text-gray-300 cursor-not-allowed'
              : isToday
              ? 'bg-blue-600 text-white'
              : isSelected
              ? 'border-2 border-blue-600 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-3">Propose Session Date & Time</h2>
      <p className="text-gray-600 mb-8">
        Select potential times for your swap. You can add as many options as you'd like.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Calendar */}
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handlePrevMonth} 
                className={`p-2 rounded ${isPastMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)) ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                disabled={isPastMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">{monthName}</h3>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div>
          {selectedDate && (
            <>
              <p className="text-lg font-semibold mb-4">
                Choose a Time for {formatDateForDisplay(selectedDate)}
              </p>
              <p className="text-sm text-gray-600 mb-4">All times are in your local time</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white'
                        : 'border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
                <button
                  onClick={() => handleTimeSelect('custom')}
                  className={`py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                    showCustomTimeInput
                      ? 'bg-blue-600 text-white'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Custom
                </button>
              </div>

              {showCustomTimeInput && (
                <div className="mb-4 space-y-3">
                  <p className="text-sm font-medium text-gray-700">Enter Custom Time</p>
                  <div className="flex gap-2 items-center">
                    <select
                      value={customHour}
                      onChange={(e) => setCustomHour(e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-200 rounded-lg font-medium text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Hour</option>
                      {[...Array(12)].map((_, i) => {
                        const hour = i + 1;
                        return (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-2xl font-bold text-gray-400">:</span>
                    <select
                      value={customMinute}
                      onChange={(e) => setCustomMinute(e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-200 rounded-lg font-medium text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Min</option>
                      {['00', '15', '30', '45'].map((min) => (
                        <option key={min} value={min}>
                          {min}
                        </option>
                      ))}
                    </select>
                    <select
                      value={customPeriod}
                      onChange={(e) => setCustomPeriod(e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-200 rounded-lg font-medium text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleCustomTimeSubmit}
                    disabled={!customHour || !customMinute}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add This Time Slot
                  </Button>
                </div>
              )}

              {!showCustomTimeInput && selectedTime && (
                <Button
                  onClick={handleAddTimeSlot}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add This Time Slot
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Proposed Times */}
      {proposedSlots.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold mb-4">Your Proposed Times ({proposedSlots.length})</p>
          <div className="space-y-2">
            {proposedSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
              >
                <span className="text-gray-700">
                  {formatDateForDisplay(slot.date)} - {slot.time}
                </span>
                <button
                  onClick={() => handleRemoveSlot(index)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onBack} className="px-8">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={proposedSlots.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
}