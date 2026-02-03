import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { notification } from 'antd';

import Step1SelectSkillToOffer from "./swap-steps/step-1-select-skill-offer";
import Step2SelectSkillToLearn from "./swap-steps/step-2-select-skill-learn";
import Step3ProposeDateAndTime from "./swap-steps/step-3-propose-date-time";
import Step4ChooseDuration from "./swap-steps/step-4-choose-duration";
import Step5OptionalMessage from "./swap-steps/step-5-optional-message";
import Step6ReviewAndConfirm from "./swap-steps/step-6-review-confirm";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import qs from "qs";
import { Avatar } from '@/components/ui/avatar';

export default function SwapRequestForm({ onClose }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation();
  const [formData, setFormData] = useState({});
  const topReference = useRef(null);
  const userData = state?.userData;
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  const getSkills = async () => {
    try {
      const response = await api.get(
        "/User/Details",
        {
          params: {
            include: ["Skills", "Profile"],
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        },
      );

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const steps = [
    { number: 1, title: "Skill to Offer" },
    { number: 2, title: "Skill to Learn" },
    { number: 3, title: "Date & Time" },
    { number: 4, title: "Duration" },
    { number: 5, title: "Message" },
    { number: 6, title: "Review" },
  ];

  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
    scrollToTop();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    scrollToTop();
  };

  const handleSubmit = async (stepData) => {
    setIsLoading(true);
    const finalData = { ...formData, ...stepData };

    const date = finalData?.selectedDates?.[0]?.date;
    const time = finalData?.selectedDates?.[0]?.time;

    const scheduleDateTime =
      date && time
        ? date + "T" + time + ":00"
        : null;

    const emailrequestPayload = {
      PartnerImageUrl: finalData?.partnerData?.user?.avatar ?? null,
      PartnerEmail: finalData?.partnerData?.user?.email ?? null,
      YourImageUrl: finalData?.userData?.profile?.profilePhotoUrl ?? null,
      YourSkill: finalData?.skillToOffer ?? null,
      PartnerSkill: finalData?.skillToLearn ?? null,
      ScheduleDateTime: scheduleDateTime,
      Format: "Video Call",
      DurationMinutes: Number(finalData?.duration) || null,
      PersonalMessage: finalData?.message ?? null,
      YourName:
        (finalData?.userData?.firstName ?? "") +
        (finalData?.userData?.lastName
          ? " " + finalData.userData.lastName
          : "")
    };


    const requestPayload = {
      requesterId: data.profile?.id ?? null,
      receiverId: finalData?.partnerData?.user?.id ?? null,
      skillToOffer: finalData?.skillToOffer ?? null,
      skillToLearn: finalData?.skillToLearn ?? null,
      proposedTime: scheduleDateTime,
      durationMinutes: Number(finalData?.duration) || null,
      message: finalData?.message ?? null,
    };

    console.log("User Data :", data);
    console.log("userData2:", userData);


    console.log("Final Data :", finalData);

    console.log("Request Payload :", requestPayload);


    try {
      const response = await api.post(
        "/swap-request",
        requestPayload,
      );

      const emailResponse = await api.post(
        "/swap-request/send",
        emailrequestPayload,
      );

      console.log("Swap request created:", response.data);
      console.log("Email request sent:", emailResponse.data);

      notification.success({
        message: 'Request Sent Successfully',
        description: 'Your swap request has been submitted.',
        placement: 'topRight',
      });

      navigate("/my-swaps");
    }
    catch (error) {
      notification.error({
        message: 'Something Went Wrong!',
        description: 'Failed to submit your swap request. Please try again.',
        placement: 'topRight',
      });
      console.error("Error submitting swap request:", error);
    }
    finally {
      setIsLoading(false);
    }
    console.log("Final Swap Request Data:", requestPayload);

  }

  const scrollToTop = () => {
    topReference.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1SelectSkillToOffer
            data={formData}
            onNext={handleNext}
            onClose={onClose}
            userData={data}
          />
        );
      case 2:
        return (
          <Step2SelectSkillToLearn
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
            userData={userData}
          />
        );
      case 3:
        return (
          <Step3ProposeDateAndTime
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4ChooseDuration
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <Step5OptionalMessage
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Step6ReviewAndConfirm
            data={formData}
            onNext={handleSubmit}
            onBack={handleBack}
            userData={data}
            partnerData={userData}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 mt-4">
      <Card className="w-full max-w-3xl shadow-lg bg-white">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create a Swap Request</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Complete all steps to submit your request
            </p>
          </div>

          <div className="flex items-center mb-3 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center justify-center flex-shrink-0">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base
                    ${currentStep > step.number
                        ? "bg-green-500 text-white"
                        : currentStep === step.number
                          ? "border-2 border-gray-400 text-black"
                          : "bg-gray-200 text-gray-500"
                      }
                  `}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs mt-1 sm:mt-2 text-center font-medium whitespace-nowrap ${currentStep >= step.number
                      ? "text-gray-900"
                      : "text-gray-400"
                      }`}
                  >
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{step.title.split(' ')[0]}</span>
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="-mt-[15px] flex-1 mx-2 sm:mx-4 min-w-[20px]">
                    <div className="h-[2.3px] bg-gray-200 w-full" />
                  </div>
                )}
              </React.Fragment>
            ))}
            <br />
          </div>
        </div>
        {renderStep()}
      </Card>
    </div>
  );
}
