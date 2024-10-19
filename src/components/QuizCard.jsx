import React, { useState } from "react";

const QuizCard = ({ questions, setProgressBarParameters, onQuizRetake }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [viewScore, setViewScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const nextQuestion = () => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    const answers = [
      ...userAnswers,
      {
        question: currentQuestion + 1,
        answer: selectedOption,
        isCorrect: isCorrect,
      },
    ];
    setUserAnswers(answers);

    setProgressBarParameters(currentQuestion);

    if (currentQuestion == questions.length - 1) {
      calucalateQuizScore(answers);
      setViewScore(true);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption(null);
    }
  };

  const calucalateQuizScore = (answers) => {
    let score = answers.filter((answer) => answer.isCorrect).length;
    setScore(score);
  };

  const onRetakeQuiz = () => {
    setViewScore(false);
    setScore(0);
    setCurrentQuestion(0);
    onQuizRetake();
    setSelectedOption(null);
    setUserAnswers([]);
    setShowAnswers(false);
  };
  return (
    <div className="w-full md:w-9/12 lg:w-5/12 mt-14 mb-7 md:mb-14 md:mt-16 lg:mt-0 min-h-5/6 md:mx-auto">
      <div className="border-2 border-gray-200 rounded-2xl">
        <div className="bg-[#003366] rounded-t-2xl py-5">
          <p className="p-4 text-center text-white">
            {" "}
            {viewScore
              ? "Your Score"
              : questions &&
                `${currentQuestion + 1}. ${
                  questions[currentQuestion].question
                }`}
          </p>
        </div>
        {!viewScore ? (
          <div className="grid grid-rows-4 md:grid-rows-2 md:grid-cols-2 gap-4 py-7 md:py-10 px-5 md:mx-10 lg:mx-12 min-h-5/6">
            {questions &&
              Object.entries(questions[currentQuestion].options).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className={`border-2 rounded-xl text-center p-2 cursor-pointer my-auto hover:scale-105 transition-transform duration-300  ${
                      key === selectedOption ? "bg-[#003366]" : " "
                    }`}
                    onClick={() => setSelectedOption(key)}
                  >
                    <p
                      className={`text-sm  ${
                        key === selectedOption ? "text-white" : " "
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                )
              )}
          </div>
        ) : (
          <div className="mx-auto">
            <p className="text-center my-5">
              {`You scored ${score} out of ${questions.length}!`}{" "}
            </p>
          </div>
        )}
        <div className="w-28 mx-auto mb-6">
          {questions && currentQuestion !== questions.length - 1 ? (
            selectedOption ? (
              <button
                onClick={nextQuestion}
                className="hover:text-[#BDDEFD] border border-[#003366] px-5 py-3 rounded-lg hover:bg-[#003366]"
              >
                Next
              </button>
            ) : (
              <button
                className="border  px-5 py-3 rounded-lg text-gray-400"
                disabled={!selectedOption}
              >
                Next
              </button>
            )
          ) : (
            <div className="w-32 mx-auto mb-6">
              {!viewScore ? (
                <button
                  className={`${
                    !viewScore
                      ? "hover:text-[#BDDEFD] hover:bg-[#003366] border-2 border-[#003366] px-5 py-3 rounded-lg"
                      : ""
                  }`}
                  onClick={nextQuestion}
                  disabled={!selectedOption}
                >
                  View Score
                </button>
              ) : (
                <button
                  className="hover:text-[#BDDEFD] hover:bg-[#003366] border-2 border-[#003366] px-5 py-3 rounded-lg"
                  onClick={onRetakeQuiz}
                >
                  Retake Quiz
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="my-2 ml-3 mr-3">
        {viewScore && !showAnswers && (
          <div
            onClick={() => {
              setShowAnswers(true);
            }}
          >
            <p className="text-sm text-gray-500 cursor-pointer md:text-right">
              Show Answers
            </p>
          </div>
        )}
        {showAnswers && (
          <div className="mx-auto flex flex-row space-x-4 justify-start md:justify-end">
            {userAnswers.map((userAnswer, index) => (
              <p
                key={index}
                className={`text-sm ${
                  userAnswer.isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >{`${userAnswer.question}. ${userAnswer.answer}`}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
