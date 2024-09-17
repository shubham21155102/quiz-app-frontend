import React, { useEffect, useState } from 'react';

type Props = {
  questions: datas[];
};

type datas = {
  question: string;
  options: option_data;
  answer: string;
};

type option_data = {
  A: string;
  B: string;
  C: string;
  D: string;
};

const Questions = (props: Props) => {
  const { questions } = props;

  // State for timer
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds
  const [timerEnded, setTimerEnded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerEnded(true);
      return;
    }

    // Timer interval
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timerEnded && !selectedOption) {
      handleNextQuestion();
    }
  }, [timerEnded]);

  const handleOptionClick = (id: string) => {
    if (selectedOption || timerEnded) return;

    const currentQuestion: datas = questions[currentIndex];
    const isCorrect = currentQuestion?.answer === id;

    setSelectedOption(id);
    if (isCorrect) {
      setCorrectOption(id);
      setScore(prevScore => prevScore + 1);
    } else {
      setCorrectOption(currentQuestion.answer);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1000); // 1 second delay before moving to the next question
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setTimeLeft(90); // Reset timer for the next question
      setTimerEnded(false);
    } else {
      setCurrentIndex(questions.length);
    }
    setSelectedOption(null);
    setCorrectOption(null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQuestion: datas = questions[currentIndex];

  if (currentIndex === questions.length) {
    return (
      <div className="w-screen h-screen flex justify-center items-center mx-auto p-8 text-black" style={{ backgroundColor: "#ecf5ff" }}>
        <div className="justify-center flex-column">
          <h2 className='text-[3rem] font-bold'>Your Score</h2>
          <h1 className="text-[5.4rem] text-[#56a5eb] mb-20">{score} / {questions.length}</h1>
        </div>
      </div>
    );
  }

  const options: option_data = currentQuestion.options;
  return (
    <div className="w-screen h-screen flex justify-center items-center mx-auto p-8 text-black" style={{ backgroundColor: "#ecf5ff" }}>
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-center text-2xl">Question {currentIndex + 1}/{questions.length}</p>
            <div className="w-80 h-16 border-4 border-[#56a5eb] mt-6">
              <div className='h-[3.6rem] bg-[#56a5eb] w-0' style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
          </div>
          <p className="text-center text-2xl text-[5.4rem] text-[#56a5eb] mb-20">Time Left: {formatTime(timeLeft)}</p>
          <div className="flex flex-col items-center">
            <p className="text-center text-2xl">Score</p>
            <h1 className="text-[5.4rem] text-[#56a5eb] mb-20">{score}</h1>
          </div>
        </div>
        <h2 className='text-[3rem] font-bold text-center mb-8'>{currentQuestion.question}</h2>
        {Object.entries(options).map(([key, option]) => (
          <div
            key={key}
            className={`flex mb-2 w-full text-xl border border-[#56a5eb]/25 bg-white hover:cursor-pointer hover:shadow-md hover:shadow-[#56b9eb]/50 hover:translate-y-[-0.1rem] hover:transition-transform hover:duration-150 ${selectedOption === key ? (key === currentQuestion.answer ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : ''}`}
            onClick={() => handleOptionClick(key)}
          >
            <p className="p-6 bg-[#56a5eb] text-white">{key}</p>
            <p className="p-6 w-full">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;