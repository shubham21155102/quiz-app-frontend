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
    }, [slug]);

    return (
        <>
            {questionLoading ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20">
                            <FidgetSpinner
                                visible={true}
                                height="100%"
                                width="100%"
                                ariaLabel="fidget-spinner-loading"
                                ballColors={['#56a5eb', '#ffffff', '#56a5eb']} 
                                backgroundColor="#333333" 
                            />
                        </div>
                        <p className="text-lg font-semibold text-gray-700">Loading questions...</p>
                    </div>
                </div>
            ) : (
                <Questions questions={questions_data} />
            )}
        </>
    );
};

export default Quiz;