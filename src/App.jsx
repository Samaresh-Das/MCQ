import { useState } from "react";
import QuizCard from "./components/QuizCard";
import { questions } from "./quizData";
import QuizProgressBar from "./components/QuizProgressBar";

function App() {
  const [progressBarStep, setProgressBarStep] = useState(0);

  const setProgressBarParameters = (value) => {
    setProgressBarStep(value + 1);
  };

  const onQuizRetake = () => {
    setProgressBarStep(0);
  };
  return (
    <>
      <div className=" mt-20 md:my-28 lg:my-32 w-10/12 md:w-9/12 mx-auto">
        <QuizProgressBar
          quizBarSteps={questions && questions.length}
          stepsCompleted={progressBarStep}
        />
      </div>
      <div>
        <QuizCard
          questions={questions}
          setProgressBarParameters={setProgressBarParameters}
          onQuizRetake={onQuizRetake}
        />
      </div>
    </>
  );
}

export default App;
