import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const QuizProgressBar = ({ quizBarSteps, stepsCompleted }) => {
  const stepsClassName =
    "w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full flex justify-center items-center  text-xs border-primary-50";

  const steps = Array.from({ length: quizBarSteps }, (_, index) => index + 1);

  const completionPercentage = (stepsCompleted / quizBarSteps) * 100;

  return (
    <div className="w-90 md:w-full mx-auto">
      <ProgressBar
        percent={completionPercentage}
        filledBackground="#003366"
        unfilledBackground="#D1D1DB"
        height={4}
      >
        {steps.map((step) => (
          <Step
            key={step}
            transition="scale"
            accomplished={step <= stepsCompleted}
          >
            {({ accomplished }) => (
              <div
                className={`border md:border-2 border-[#003366] ${stepsClassName} ${
                  accomplished
                    ? "bg-[#003366] text-white"
                    : "bg-white text-[#003366] "
                }`}
              >
                {step}
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>
    </div>
  );
};

export default QuizProgressBar;
