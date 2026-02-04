import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Plus } from 'lucide-react';

const mockAvailableSkills = [
  {
    id: '1',
    title: 'Digital Marketing',
    description: 'Learn the fundamentals of online marketing, social media, and content strategy.',
  },
  {
    id: '2',
    title: 'Beginner Guitar Lessons',
    description: 'Master the basics of acoustic guitar, from chords to simple songs.',
  },
  {
    id: '3',
    title: 'Advanced SEO Techniques',
    description: 'Dive deep into search engine optimization to improve website rankings.',
  },
  {
    id: '4',
    title: 'Python Programming',
    description: 'Learn Python fundamentals and build real-world applications.',
  },
];

export default function Step2SelectSkillToLearn({
  data,
  onNext,
  onBack,
  userData
}) {
  const [selected, setSelected] = useState(data?.skillToLearn || null);
  const [requestSkill, setRequestSkill] = useState(data?.requestSkill || '');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('available');

  const filteredSkills = userData.offeredSkills.filter(
    (skill) =>
      skill.title.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    if (selected || requestSkill) {
      onNext({ skillToLearn: tab === 'available' ? selected : requestSkill });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">

      {/* Title and Description */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">What Skill Do You Want to Learn?</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        Select a skill from available options or request a new one.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setTab('available')}
          className={`pb-2 sm:pb-3 px-3 sm:px-4 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${tab === 'available'
              ? 'border-b-2 border-blue-600 text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          From {userData.user.name}'s Skills
        </button>
        <button
          onClick={() => { setSelected(null); setTab('request') }}
          className={`pb-2 sm:pb-3 px-3 sm:px-4 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${tab === 'request'
            ? 'border-b-2 border-blue-600 text-gray-900'
            : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          Request a New Skill
        </button>
      </div>

      {tab === 'available' ? (
        <>
          {/* Search */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Search skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 sm:pl-12 py-2 sm:py-3 border-gray-200 text-sm sm:text-base"
            />
          </div>

          {/* Skills List */}
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            {filteredSkills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => selected ? setSelected(null) : setSelected(skill.title)}
                className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${selected === skill.title
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{skill.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {skill.level != null ? skill.level : ""}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex-shrink-0 ml-2 sm:ml-4 ${selected === skill.title
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                      }`}
                  >
                    {selected === skill.title && (
                      <svg className="w-full h-full text-white p-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Can't find the skill you're looking for? You can request it from the person you're swapping with.
          </p>
          <Input value={requestSkill} onChange={(e) => setRequestSkill(e.target.value)} placeholder="Describe the skill you'd like to learn..." className="border-gray-200 text-sm sm:text-base" />
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto px-6 sm:px-8 bg-transparent">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={(!selected && tab === 'available') || (tab === 'request' && !requestSkill)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
}