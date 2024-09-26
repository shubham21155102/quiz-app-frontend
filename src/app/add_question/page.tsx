"use client";
import React, { useState } from 'react'
const AddQuestion = () => {
    const [department, setDepartment] = useState("CSE_DBMS");
    const [year, setYear] = useState("2025");
    const [image, setImage] = useState("null");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
    const [answer, setAnswer] = useState("");

    const handleOptionChange = (key: string, value: string) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [key]: value
        }));
    };

    const addQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("https://api.shubhamiitbhu.in/gate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    department,
                    year,
                    image: image || "null", 
                    question,
                    options,
                    answer
                })
            })
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.error(e)
        }
        alert("Question added successfully");
    }

    return (
        <div className="max-w-lg mx-auto p-6 shadow-md rounded-md text-black" style={{backgroundColor:"powderblue"}}>
          <center> <h1 className="text-2xl font-bold mb-6">Add Question</h1></center> 
            <form onSubmit={addQuestion} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input 
                        type="text" 
                        value={department} 
                        onChange={(e) => setDepartment(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id='department'
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input 
                        type="text" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id='year'
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input 
                        type="text" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id='image'
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <textarea 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id='question'
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Options</label>
                    {['A', 'B', 'C', 'D'].map((key) => (
                        <div key={key} className="mt-2">
                            <label className="block text-sm font-medium text-gray-700">{`Option ${key}`}</label>
                            <input 
                                type="text" 
                                value={options[key as keyof typeof options]} 
                                onChange={(e) => handleOptionChange(key, e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id={`option-${key}`}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Answer</label>
                    <input 
                        type="text" 
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id='answer'
                    />
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Question
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddQuestion;