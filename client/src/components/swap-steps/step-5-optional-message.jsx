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
    onNext({ message });
  };

  return (
    <div className="p-8">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-3">
        Add an Optional Message
      </h2>

      <p className="text-gray-600 mb-8">
        A personal message and clear learning goals can increase your chances of acceptance.
      </p>

      {/* Label */}
      <label className="block font-semibold text-gray-900 mb-3">
        Your message
      </label>

      {/* Textarea */}
      <Textarea
        value={message}
        onChange={(e) =>
          setMessage(e.target.value.slice(0, maxChars))
        }
        placeholder={messageTemplate}
        className="w-full min-h-48 p-4 border border-gray-200 rounded-lg resize-none
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Character count */}
      <div className="text-right text-sm text-gray-600 mb-8">
        {message.length} / {maxChars}
      </div>

      {/* Tips box */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-2">
              Tips for a great message
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• What you hope to learn.</li>
              <li>• Why you're interested in their skill.</li>
              <li>• Your general availability.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="px-8 bg-transparent"
        >
          Back
        </Button>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleNext}
            className="px-8 bg-transparent"
          >
            Skip this step
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}