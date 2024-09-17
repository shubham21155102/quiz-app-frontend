"use client";
import React, { useEffect, useState } from 'react'
import {FidgetSpinner } from 'react-loader-spinner';
import Questions from './questions';

const Quiz = (props: any) => {
    const {slug} = props.params;
    console.log(slug);
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

    },[questionLoading,questions_data]);

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
    />
     </div>
        </center>       
            </div>

        </>):(<>
            <Questions questions={questions_data}/>
        </>)}
        </>
    )
}

export default Quiz;