import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Clock, ArrowLeftRight, Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";


export default function Step6ReviewRequest({ data, onNext, onBack, userData, partnerData, isLoading = false }) {

  const handleConfirm = () => {
    onNext({ data, userData, partnerData });
  };

  const formatDateForDisplay = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  console.log(partnerData);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Review Your Swap Request</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        Please review all the details before sending your request.
      </p>

      {/* The Swap Section */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">The Swap</h3>
        <div className="border-2 border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Your Skill */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
              {userData.profile?.profilePhotoUrl ? (
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-4 border-white ring-1 ring-slate-100 bg-white shadow-sm transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <AvatarImage
                    src={userData.profile?.profilePhotoUrl}
                    alt={userData.user?.name}
                  />
                </Avatar>
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                  U
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">You</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {data?.skillToOffer}
                </p>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="mx-0 sm:mx-6 my-2 sm:my-0">
              <ArrowLeftRight className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 rotate-90 sm:rotate-0" />
            </div>

            {/* Partner's Skill */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
              {partnerData.user?.avatar ? (
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-4 border-white ring-1 ring-slate-100 bg-white shadow-sm transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <AvatarImage
                    src={partnerData.user?.avatar}
                    alt={partnerData.user?.name}
                  />
                </Avatar>
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                  P
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">Partner</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {data?.skillToLearn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* Proposed Schedule */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Proposed Schedule</h3>
          <div className="space-y-3 sm:space-y-4">
            {/* Date & Time */}
            <div className="flex gap-2 sm:gap-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Date & Time</p>
                {data?.selectedDates && data.selectedDates.length > 0 ? (
                  <div className="space-y-2">
                    {data.selectedDates.map((slot, index) => (
                      <p key={index} className="font-medium text-gray-900 text-sm sm:text-base break-words">
                        {formatDateForDisplay(slot.date)} at {slot.time}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium text-gray-900 text-sm sm:text-base">
                    October 28, 2023 at 4:00 PM
                  </p>
                )}
              </div>
            </div>

            {/* Location / Format */}
            <div className="flex gap-2 sm:gap-3">
              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Format</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  Online via Video Call
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex gap-2 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Estimated Duration</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {data?.duration} Min
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Message */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Personal Message</h3>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 sm:p-4 min-h-[150px] sm:min-h-[200px]">
            <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{data?.message}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto px-6 sm:px-8">
          Back
        </Button>
        <Button
          onClick={handleConfirm}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Request...
            </>
          ) : (
            "Confirm & Send Request"
          )}
        </Button>
      </div>
    </div>
  );
}