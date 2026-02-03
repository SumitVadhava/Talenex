import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lightbulb } from 'lucide-react';

const durationOptions = [
  { id: '30m', label: '30 minutes', value: '30' },
  { id: '1h', label: '60 minutes', value: '60' },
  { id: '1.5h', label: '90 minutes', value: '90' },
  { id: 'custom', label: 'Custom', value: 'custom' },
];

export default function Step4ChooseDuration({
  data,
  onNext,
  onBack,
}) {
  const [selected, setSelected] = useState(data?.duration || '');
  const [customDuration, setCustomDuration] = useState('');

  const handleNext = () => {
    const duration = selected === 'custom' ? customDuration : selected;
    if (duration) {
      onNext({ duration });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">

      {/* Title and Description */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Choose Session Duration</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        How long do you estimate the session will take? You can finalize this with your swap partner later.
      </p>

      {/* Duration Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {durationOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSelected(option.value);
              if (option.id !== 'custom') {
                setCustomDuration('');
              }
            }}
            className={`p-3 sm:p-4 rounded-lg border-2 font-medium transition-all text-center text-sm sm:text-base ${selected === option.value
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Custom Duration Input */}
      {selected === 'custom' && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
          <label className="block font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Enter duration (in minutes)</label>
          <Input
            type="number"
            placeholder="e.g., 45"
            value={customDuration}
            onChange={(e) => setCustomDuration(e.target.value)}
            min="1"
            className="border-gray-200 text-sm sm:text-base"
          />
        </div>
      )}

      {/* Tip Box */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex gap-2 sm:gap-3">
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-gray-700">
            <span className="font-semibold text-blue-900">Tip:</span> Most 'Graphic Design Feedback' sessions last about 45-60 minutes.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto px-6 sm:px-8 bg-transparent">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selected || (selected === 'custom' && !customDuration)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
}