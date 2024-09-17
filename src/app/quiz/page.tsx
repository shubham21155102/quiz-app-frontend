import React from 'react'



const QuizStartWindow = () => {
  return (

   <>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Welcome to the Quiz</h1>
        <p className="text-center text-gray-500 mt-2">Click the button below to start the quiz</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Start Quiz</button>
      </div>
    </div>
   </>
  )
}

export default QuizStartWindow