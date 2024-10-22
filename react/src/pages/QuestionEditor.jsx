import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function QuestionEditor({
    index =0,
    addQuestion,
    questionChange,
    deleteQuestion,
    question,
}) {
    const [model, setModel] = useState({...question} ); //TODO
   
    const { questionType } = useAuthContext();
    useEffect(() => {
        questionChange(model)
    }, [model]);
    const uppserCaseFirst = (str) =>{
        return str.charAt(0).toUpperCase()+str.slice(1);
    }
    return (
        <div>
            <div className="flex justify-between ">
             
                <h4>
                    {index + 1}. {model.question}
                </h4>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={()=>addQuestion(index+1)}
                        className="bg-gray-500 flex items-center gap-1 text-white hover:bg-gray-600 py-1 rounded-sm px-3 text-sm"
                    >
                        <PlusIcon className="w-5 h-5" /> Add
                    </button>
                    <button
                        type="button"
                        onClick={()=>deleteQuestion(model)}
                        className="text-red-500 flex items-center border border-white hover:border-red-500 rounded py-1 px-2"
                    >
                        <TrashIcon className="w-5 h-5" /> Delete
                    </button>
                </div>
            </div>
            <div className="flex gap-4 justify-between mb-3">
                <div className="flex-1">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700"
                    >
                        Question
                    </label>
                    <input
                        type="text"
                        name="question"
                        value={model.question}
                        onChange={(e) =>
                            setModel({ ...model, question: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="question type"
                        className="text-sm font-medium text-gray-700"
                    >
                        Question Type
                    </label>
                    <select
                    value={model.type}
                        className="block w-full rounded-md mt-1 border border-gray-300 text-gray-500 shadow-sm py-2 px-3 focus:border-indigo-300 focus:outline-none focus:ring-indigo-500"
                        onChange={(e) =>
                            setModel({ ...model, type: e.target.value })
                        }
                    >
                        {questionType.map((type) => (
                            <option
                                key={type}
                                value={type}
                            >
                                {uppserCaseFirst(type)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label
                    htmlFor="desciption"
                    className="text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <textarea value={model.description} onChange={(e)=>setModel({...model,description:e.target.value})} className="block w-full mt-1 rounded border-gray-300 focus:border-indigo-500 text-gray-600 focus:ring-indigo-500 focus:outline-none"></textarea>
            </div>
        </div>
    );
}
