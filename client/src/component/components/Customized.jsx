import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Questionnaire = () => {
    const { userId } = useParams();  // Get user ID from URL
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState('');

    // Predefined set of questions
    const questions = [
        { question: "Are you a student?", options: ["Yes", "No"], field: "student" },
        { question: "What is your caste?", options: ["SC", "ST", "OBC", "General"], field: "caste" },
        { question: "Are you from a minority group?", options: ["Yes", "No"], field: "minority" },
        { question: "What is your age group?", options: ["<18", "18-30", "31-45", "46+"], field: "ageGroup" },
    ];

    const handleAnswerChange = (field, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/custom/user-questionnaire/${userId}`, {
                answers,
            });
            setMessage("Categories updated successfully!");
        } catch (error) {
            setMessage("Failed to update categories. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Questionnaire</h2>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700 mb-2">{question.question}</label>
                        <div className="flex space-x-4">
                            {question.options.map((option, idx) => (
                                <div key={idx} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`${question.field}-${option}`}
                                        name={question.field}
                                        value={option}
                                        onChange={() => handleAnswerChange(question.field, option)}
                                    />
                                    <label htmlFor={`${question.field}-${option}`} className="ml-2">{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
            </form>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </div>
    );
};

export default Questionnaire;
