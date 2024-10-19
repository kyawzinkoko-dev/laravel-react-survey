import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";
export default function SurveyQuestion({ survey, onSurveyUpdate }) {
    const [model, setModel] = useState({...survey });
    const addQuestion = () => {
        setModel({
            ...model,
            questions: [
                ...model.questions,
                {
                    id: uuidv4(),
                    type: "text",
                    question: "",
                    description: "",
                    data: {},
                },
            ],
        });
       
       
    };
    const onQuestionChange = (question) => {
        if (!question) return;
        const newQuestion = model.questions.map((q) => {
            if (q.id === question.id) {
                return { ...question };
            } else {
                return q;
            }
          
        });
        setModel({
            ...model,
            questions:newQuestion
        })
    };
    const deleteQuestion = (question) => {
        const newQuestion = model.questions.filter((q) => q.id !== question.id);
        
        setModel({
            ...model,
            questions:newQuestion,
        });
       
    };
    useEffect(() => {
        onSurveyUpdate(model);  
    }, [model]);
    return (
        <>
            <div className="flex justify-between">
                <h3>Questions</h3>
                <button
                    type="button"
                    onClick={addQuestion}
                    className="flex text-sm py-2 items-center px-4 bg-gray-600  hover:bg-gray-700  text-white rounded-sm"
                >
                    <PlusIcon className="h-5 w-5" /> Add Questions
                </button>
            </div>
            {model.questions.length ? (
                model.questions.map((q, idx) => (
                    <QuestionEditor
                        key={q.id}
                        index={idx}
                        question={q}
                        addQuestion={addQuestion}
                        questionChange={onQuestionChange}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            ) : (
                <div className="text-center py-2">
                    You don't have any question
                </div>
            )}
        </>
    );
}
