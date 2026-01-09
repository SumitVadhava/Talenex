import React, { useEffect, useState } from "react";
import Step1BasicInfo from "@/components/Step1BasicInfo";
import Step2Skills from "@/components/Step2Skills";
import Step3WantedSkills from "@/components/Step3WantedSkills";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "@/api/axios";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex items-center justify-between relative mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted
                    ? "#36B943" // Yellow-200
                    : isActive
                      ? "hsl(var(--primary))" // Purple/Indigo
                      : "hsl(var(--muted))", // Gray
                  color: isCompleted
                    ? "#36B943" // Yellow-800
                    : isActive
                      ? "#ffffff" // White
                      : "hsl(var(--muted-foreground))",
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border p-5 font-semibold text-sm  transition-shadow duration-300"
                  //  isActive ? "ring-2 ring-primary ring-offset-2 shadow-[0_0_15px_rgba(124,58,237,0.3)]" : ""
                )}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4 text-green-900" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span className="text-black">{step.id}</span>
                )}
              </motion.div>

              <span
                className={cn(
                  "ml-3 text-sm font-medium transition-colors duration-300 hidden sm:block",
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              ></span>
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div className="flex-1 h-[1px] mx-4 bg-gray-200 relative overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: isCompleted ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-primary"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Your Skills" },
    { id: 3, label: "Preferences" },
  ];

  const [formData, setFormData] = useState({
    // Step 1
    username: "",
    location: "",
    bio: "",
    profilePhotoUrl: user?.imageUrl,

    // Step 2 (Offered Skills)
    offeredSkills: [],

    // Step 3 (Wanted Skills)
    wantedSkills: [],
  });

  useEffect(() => {
    if (user?.unsafeMetadata?.onboardingCompleted) {
      navigate("/home");
    }

    const fetchAndSendToken = async () => {
      try {
        const token = await getToken({ template: "customJWT" });

        console.log("Fetched token:", token);

        var response = await api.post(
          "/auth",
          {}, // body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // localStorage.setItem("token", response.token);

        sessionStorage.setItem("token", response.token);
      } catch (error) {
        console.error("Error sending token:", error);
      }
    };

    fetchAndSendToken();
  }, [user]);

  // JS version (no TypeScript types)
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Certificates");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dpwes05hc/raw/upload",
      formData,
    )

    return res.data.secure_url;
  }

  const handleFinishOnboarding = async () => {
    if (!user) return;

    // console.log(user);

    try {
      await user.update({
        unsafeMetadata: {
          onboardingCompleted: true,

          // Clerk info
          clerkUserId: user.id,
          fullName: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          imageUrl: user.imageUrl,

          // Your onboarding data
          profile: {
            username: formData.username,
            location: formData.location,
            bio: formData.bio,
            avatarUrl: formData.avatarUrl,
          },

          offeredSkills: formData.offeredSkills,
          wantedSkills: formData.wantedSkills,
          socials: formData.socials,
        },
      });


      const processSkills = async (skills) => {
        const result = [];

        for (const skill of skills) {
          let fileUrl = null;

          if (skill.file) {
            fileUrl = await uploadToCloudinary(skill.file);
          }

          result.push({
            ...skill,
            file: fileUrl,
          });
        }

        return result;
      };


      const processedOfferedSkills = await processSkills(formData.offeredSkills);
      console.log(formData);
      console.log(processedOfferedSkills);


      // creating user and its skills
      const createUserProfile = async () => {
        // const processedOfferedSkills = await processSkills(formData.offeredSkills);

        await axios.post(
          "/UserProfile/",
          {
            "userId": "",
            "fullName": user.fullName,
            "username": formData.username,
            "bio": formData.bio,
            "profilePhotoUrl": formData.profilePhotoUrl,
            "location": formData.location,
            "offeredSkills": formData.offeredSkills,
            "wantedSkills": formData.wantedSkills,
            "latitude": 0,
            "longitude": 0
          }
        )
      };

      // const token = await getToken();
      // console.log(token);

      // const response = await axios.get(
      //   "URL",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      navigate("/home");
    } catch (error) {
      console.error("Onboarding failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-zinc-50 font-sans text-zinc-900">
      <div className="w-full max-w-3xl bg-white md:p-8 p-6 rounded-2xl shadow-xl shadow-zinc-200/50 border border-white">
        {/* Progress Indicator */}
        {/* <div className="mb-8 space-y-3">
          <div className="flex justify-between items-end">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div> */}

        <Stepper steps={steps} currentStep={currentStep} />

        {/* Dynamic Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <Step1BasicInfo
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <Step2Skills
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Step3WantedSkills
              formData={formData}
              updateFormData={updateFormData}
              onBack={prevStep}
              onFinish={handleFinishOnboarding}
            />
          )}
        </div>
      </div>
    </div>
  );
}
