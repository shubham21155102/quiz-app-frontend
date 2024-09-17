"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";


const QuizStartWindow = () => {
    const router = useRouter();
    const [quizstarted, setQuizStarted] = useState(false);
     const startQuiz=()=>{
         setQuizStarted(true)
     }
     const Topics={
        "DBMS":"CSE_DBMS",
        "OS":"CSE_OS",
        "CN":"CSE_CN",
        "OOPS":"CSE_OOPS",
        "DSA":"CSE_DSA",
        "DAA":"CSE_DAA",
        "COA":"CSE_COA",
        "TOC":"CSE_TOC",
     }
     const QuizRedirect=(Topic)=>{
        router.push(`/quiz/${Topic}`)
     }
  return (

   <>
   {quizstarted ? (<>
    <div className="flex justify-center items-center h-screen" style={{backgroundColor:"#ecf5ff"}}>
        <div className="bg-white p-8 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-900">Choose a topic</h1>
            <div className="grid grid-cols-2 gap-4 mt-4">
            {Object.keys(Topics).map((topic, index) => (
                <button key={index} className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                onClick={()=>
                    QuizRedirect(Topics[topic])
                }
                >{topic}</button>
            ))}
            </div>
        </div>

     </div>

   </>):(<> <div className="flex justify-center items-center h-screen" style={{backgroundColor:"#ecf5ff"}}>
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Welcome to the Quiz</h1>
        <p className="text-center text-gray-500 mt-2">Click the button below to start the quiz</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={startQuiz}>Start Quiz</button>
      </div>
    </div></>)}
   
   </>
  )
}

export default QuizStartWindow