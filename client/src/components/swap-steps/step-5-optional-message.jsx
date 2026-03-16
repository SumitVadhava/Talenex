import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb } from 'lucide-react';

const messageTemplate = `Hi [User's Name]! I'd love to learn [Skill] from you. I'm hoping to achieve... My availability is generally...`;

export default function Step5OptionalMessage({
  data,
  onNext,
  onBack,
}) {
  const [message, setMessage] = useState(data?.message || '');
  const maxChars = 1000;

  const handleNext = () => {
    if (message.trim()) {
      onNext({ message });
    }
  };

  const handleSkip = () => {
    onNext({ message: '' });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
        Add an Optional Message
      </h2>

      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        A personal message and clear learning goals can increase your chances of acceptance.
      </p>

      {/* Label */}
      <label className="block font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
        Your message
      </label>

      {/* Textarea */}
      <Textarea
        value={message}
        onChange={(e) =>
          setMessage(e.target.value.slice(0, maxChars))
        }
        placeholder={messageTemplate}
        className="w-full min-h-40 sm:min-h-48 p-3 sm:p-4 border border-gray-200 rounded-lg resize-none text-sm sm:text-base
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Character count */}
      <div className="text-right text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
        {message.length} / {maxChars}
      </div>

      {/* Tips box */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex gap-2 sm:gap-3">
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">
              Tips for a great message
            </p>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              <li>• What you hope to learn.</li>
              <li>• Why you're interested in their skill.</li>
              <li>• Your general availability.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto px-6 sm:px-8 bg-transparent order-1 sm:order-1 cursor-pointer"
        >
          Back
        </Button>

        <div className="flex flex-col sm:flex-row gap-3 order-2 sm:order-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="w-full sm:w-auto px-6 sm:px-8 bg-transparent cursor-pointer"
          >
            Skip this step
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            disabled={!message.trim()}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}