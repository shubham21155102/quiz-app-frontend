import React, { useEffect, useState } from 'react';
import Classes from "./question.module.css"

type Props = {
  questions: QuestionData[];
};

type QuestionData = {
  question: string;
  options: OptionData;
  answer: string;
};

type OptionData = {
  A: string;
  B: string;
  C: string;
  D: string;
};
const Questions = (props: Props) => {
  const { questions } = props;
  const [timeLeft, setTimeLeft] = useState(questions.length * 60);
  const [timerEnded, setTimerEnded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [map, setMap] = useState<Map<number, {solved: boolean, result: boolean, markedOption: string,currentScore:number}>>(new Map());

  useEffect(() => {
    const cachedMap = localStorage.getItem('map');
    if (cachedMap) {
      // setMap(new Map(JSON.parse(cachedMap)));
    }
    if (timeLeft === 0) {
      setTimerEnded(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (id: string) => {
    if (selectedOption || timerEnded){
      return;
    }
    const currentQuestion = questions[currentIndex];
    const isCorrect = currentQuestion?.answer === id;

    setSelectedOption(id);
    setCorrectOption(currentQuestion.answer);
    setMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(currentIndex, { solved: true, result: isCorrect, markedOption: id,currentScore:score });
      return newMap;
    });
    localStorage.setItem('map', JSON.stringify(Array.from(map.entries())));

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setCorrectOption(null);
      setTimerEnded(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (timerEnded && !selectedOption) {
      handleNextQuestion();
    }
  }, [timerEnded, currentIndex]);

  const currentQuestion = questions[currentIndex];

  if (currentIndex >= questions.length) {
    return (
      <div className={`w-screen h-screen flex justify-center items-center mx-auto p-8 text-black ${Classes.main}`}>
        <div className="justify-center flex-column">
          <h2 className='text-[3rem] font-bold'>Your Score</h2>
          <h1 className="text-[5.4rem] text-[#56a5eb] mb-20">{score} / {questions.length}</h1>
        </div>
      </div>
    );
  }

  const options = currentQuestion.options;

  return (
    <div className={`w-screen h-screen flex flex-col justify-start items-center mx-auto p-0 text-black ${Classes.main}`}>
      <div className='w-full flex flex-row items-center overflow-x-auto scroll-m-2'>
        {questions.map((question, index) => {
          const questionStatus = map.get(index);
          return (
            <div key={index} className='bg-gradient-to-r from-blue-500 to-white rounded-md p-4 mt-2'>
              <button
                className={`text-black p-2 rounded-md ${
                  questionStatus?.solved ? questionStatus?.result ? 'bg-green-500' : 'bg-red-500' : 'bg-white'
                  
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setSelectedOption(questionStatus?.markedOption || null);
                  setCorrectOption(questionStatus?.solved ? questions[index].answer : null);
                }}
              >
                {index + 1}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-center text-2xl">Question {currentIndex + 1}/{questions.length}</p>
            <div className="w-80 h-16 border-4 border-[#56a5eb] mt-6">
              <div className='h-[3.6rem] bg-[#56a5eb]' style={{ width: `${((map.size) / questions.length) * 100}%` }}></div>
            </div>
          </div>
          <p className="text-2xl text-[#56a5eb] mb-20 font-bold">Time Left: {formatTime(timeLeft)}</p>
          <div className="flex flex-col items-center">
            <p className="text-center text-2xl">Score</p>
            <h1 className="text-[5.4rem] text-[#56a5eb] mb-20">{score}</h1>
          </div>
        </div>
        <h2 className='text-[3rem] font-bold text-center mb-8'>{currentQuestion.question}</h2>
        {Object.entries(options).map(([key, option]) => {
  const questionStatus = map.get(currentIndex);
  const isSelected = selectedOption === key;
  const isCorrect = key === correctOption;
  const isMarked = questionStatus?.markedOption === key;
  let optionClass = 'flex mb-2 w-full text-xl border border-[#56a5eb]/25 bg-white hover:cursor-pointer hover:shadow-md hover:shadow-[#56b9eb]/50 hover:translate-y-[-0.1rem] hover:transition-transform hover:duration-150';

  if (isSelected) {
    optionClass += isCorrect ? ' bg-green-500 border-green-100' : ' bg-red-500 border-red-100';
  } else if (isMarked) {
    optionClass += isCorrect ? ' bg-green-500 border-green-100' : ' bg-red-500 border-red-100';
  }

  return (
    <div
      key={key}
      className={optionClass}
      onClick={() => handleOptionClick(key)}
    >
      <p className="p-6 bg-[#56a5eb] text-white">{key}</p>
      <p className="p-6 w-full">{option}</p>
    </div>
  );
})}
      </div>
    </div>
  );
};

export default Questions;