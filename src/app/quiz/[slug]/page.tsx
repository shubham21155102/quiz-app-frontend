"use client";
import React, { useEffect, useState } from 'react'
import { Blocks, Circles, FidgetSpinner } from 'react-loader-spinner';
import Questions from './questions';

const Quiz = (props: any) => {
    const slug = props.params.slug;
    const [questionLoading, setQuestionLoading] = useState(true);
    const [questions_data, setQuestionsData] = useState([]);
    console.log(slug);
    // const allQuizes:any = {
    //     "CSE_DBMS": "DBMS",
    //     "CSE_DSA": "DSA",
    //     "CSE_OS": "OS",
    //     "CSE_CN": "CN",
    //     "CSE_DL": "DL",
    //     "CSE_CD": "CD",
    //     "CSE_COA": "COA",
    //     "CSE_DM": "DM",
    //     "CSE_OOPS": "OOPS",
    // };
    const questions = async () => {
        try {
            const res = await fetch(`https://api.shubhamiitbhu.in/gate?department=${encodeURIComponent(slug)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setQuestionLoading(false);
            setQuestionsData(data);
            console.log("Slug After Fetching", slug);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    }

    useEffect(() => {
        questions();

    },[questionLoading]);

    return (
        <>
        {questionLoading ?(<>
            <div className="mx-auto p-6 shadow-md rounded-md text-black" >
     <center>
    
     <div className="w-48 h-48 border-8 border-white border-t-[1.6rem] border-t-[#56a5eb] rounded-full animate-spin">
     <FidgetSpinner
             visible={true}
             height="80"
             width="80"
             ariaLabel="fidget-spinner-loading"
             wrapperStyle={{}}
             wrapperclassName="fidget-spinner-wrapper"
    />
    <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperclassName=""
  visible={true}
  />
  <Blocks
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperclassName="blocks-wrapper"
  visible={true}
  />
     </div>
        </center>       
            </div>

        </>):(<>
        {/* <div className="mx-auto p-6 shadow-md rounded-md text-black"  style={{backgroundColor:"#ecf5ff"}}>
            <center>
            <h1 className="text-2xl font-bold mb-6">{allQuizes[slug]}</h1>
            </center> */}
            {/* <div className="space-y-4 bg-white">
                {questions_data.map((question: any, index: number) => (
                    <center key={index} >
                    <div className="p-4 border border-gray-200 rounded-md">
                        <h2 className="text-xl font-bold">{question.question}</h2>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input type="radio" name={question.question} id={question.question + "A"} value="A" />
                                <label htmlFor={question.question + "A"}>{question.options.A}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name={question.question} id={question.question + "B"} value="B" />
                                <label htmlFor={question.question + "B"}>{question.options.B}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name={question.question} id={question.question + "C"} value="C" />
                                <label htmlFor={question.question + "C"}>{question.options.C}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name={question.question} id={question.question + "D"} value="D" />
                                <label htmlFor={question.question + "D"}>{question.options.D}</label>
                            </div>
                        </div>

                    </div>
                    </center>

                ))}
            </div> */}
            <Questions questions={questions_data}/>
        </>)}
        </>
    )
}

export default Quiz;