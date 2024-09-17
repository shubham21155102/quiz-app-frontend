"use client";
import React, { useEffect, useState } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import Questions from './questions';

// Define types for props
type Props = {
    params: {
        slug: string;
    };
};

// Define types for questions_data
type OptionData = {
    A: string;
    B: string;
    C: string;
    D: string;
};

type QuestionData = {
    question: string;
    options: OptionData;
    answer: string;
};

const Quiz = (props: Props) => {
    const { slug } = props.params;
    console.log(slug);
    const [questionLoading, setQuestionLoading] = useState(true);
    const [questions_data, setQuestionsData] = useState<QuestionData[]>([]);


    const fetchQuestions = async () => {
        try {
            const res = await fetch(`https://api.shubhamiitbhu.in/gate?department=${encodeURIComponent(slug)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setQuestionsData(data);
            setQuestionLoading(false);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [slug]); // Only include 'slug' in the dependency array if it affects the fetch operation

    return (
        <>
            {questionLoading ? (
                <div className="mx-auto p-6 shadow-md rounded-md text-black">
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
            ) : (
                <Questions questions={questions_data} />
            )}
        </>
    );
};

export default Quiz;