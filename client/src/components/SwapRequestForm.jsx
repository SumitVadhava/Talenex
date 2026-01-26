import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

import Step1SelectSkillToOffer from "./swap-steps/step-1-select-skill-offer";
import Step2SelectSkillToLearn from "./swap-steps/step-2-select-skill-learn";
import Step3ProposeDateAndTime from "./swap-steps/step-3-propose-date-time";
import Step4ChooseDuration from "./swap-steps/step-4-choose-duration";
import Step5OptionalMessage from "./swap-steps/step-5-optional-message";
import Step6ReviewAndConfirm from "./swap-steps/step-6-review-confirm";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";

export default function SwapRequestForm({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
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
      const response = await axios.get(
        "http://localhost:5296/api/User/Details",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const handleSubmit = (stepData) => {
    const finalData = { ...formData, ...stepData };
    console.log("Swap Request Submitted:", finalData);
    alert("Swap request submitted successfully!");
  };

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
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-4">
      <Card className="w-full max-w-3xl shadow-lg bg-white">
        <div className="px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create a Swap Request</h1>
            <p className="text-gray-600">
              Complete all steps to submit your request
            </p>
          </div>

          <div className="flex items-center mb-3">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${
                      currentStep > step.number
                        ? "bg-green-500 text-white"
                        : currentStep === step.number
                          ? "border-2 border-gray-400 text-black"
                          : "bg-gray-200 text-gray-500"
                    }
                  `}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center font-medium ${
                      currentStep >= step.number
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="-mt-[15px] flex-1 mx-4">
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
