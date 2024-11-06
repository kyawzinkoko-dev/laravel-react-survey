import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useState } from "react";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
export default function QuestionEditor({
    index = 0,
    addQuestion,
    questionChange,
    deleteQuestion,
    question,
}) {
    const [model, setModel] = useState({ ...question }); //TODO
    const { questionType } = useStateContext();
    useEffect(() => {
        questionChange(model);
    }, [model]);
    const uppserCaseFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    function shouldHaveOption(type = null) {
        type = type || model.type;
        return ["select", "radio", "checkbox"].includes(type);
    }

    function onTypeChange(ev) {
        const newModel = {
            ...model,
            type: ev.target.value,
        };
       console.log(newModel)
        if (
            !shouldHaveOption(model.type) &&
            shouldHaveOption(ev.target.value)
        ) {
            if (!model.data.options) {
                newModel.data = {
                    options: [{ id: uuidv4(), text: "" }],
                };
                
            }
            
         
        }
        setModel(newModel);
        
    }

    function addOption() {
        model.data.options.push({ id: uuidv4(), text: "" });
        setModel({ ...model });
    }
    function deleteOption(id) {
        model.data.options = model.data.options.filter(op=>op.id !== id)
        setModel({...model})
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
                        onClick={() => addQuestion(index + 1)}
                        className="bg-gray-600 flex items-center gap-1 text-white hover:bg-gray-700 py-1 rounded-sm px-3 text-sm"
                    >
                        <PlusIcon className="w-5 h-5" /> Add
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteQuestion(model)}
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
                        onChange={onTypeChange}
                    >
                        {questionType.map((type) => (
                            <option key={type} value={type}>
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
                <textarea
                    value={model.description ||""}
                    onChange={(e) =>
                        setModel({ ...model, description: e.target.value })
                    }
                    className="block w-full mt-1 rounded border-gray-300 focus:border-indigo-500 text-gray-600 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
            </div>
           
            <div>
                {shouldHaveOption() && (
                    <div className="flex justify-between mb-1 ">
                        <h4 className="font-semibold text-sm">Options</h4>
                        <button
                            type="button"
                            onClick={addOption}
                            className="bg-gray-600 flex items-center gap-1 text-white hover:bg-gray-700  rounded px-2 py-0 text-xs"
                        >
                            Add
                        </button>
                    </div>
                )}
                {model.data.options?.length === 0 && (
                    <div>You don't have any option</div>
                )}
                {model.data.options?.length > 0 &&
                    model.data.options?.map((option, index) => (
                        <div key={index} className="flex gap-1 mb-1">
                            <span>{index + 1}.</span>
                            <input
                                value={option.text}
                                onChange={(ev)=>{option.text=ev.target.value;setModel({...model})}}
                                className="w-full py-1 px-2 border-gray-300 focus:border-indigo-500 text-xs rounded-sm "
                            />
                            <div className="flex flex-1">
                                <button
                                    onClick={() => deleteOption(option.id)}
                                    type="button"
                                    className="w-6 border border-transparent hover:border-red-200 transition-colors  flex justify-center items-center rounded-full"
                                >
                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            {/* {model.type && model.type == "select" && (
                <div className="flex gap-2">
                    <input className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 " />
                    <button
                        type="button"
                        className="bg-gray-600 flex items-center gap-1 text-white hover:bg-gray-700  rounded px-2 py-0 text-xs"
                    >
                         Add
                    </button>
                    <button
                        type="button"
                        className="text-red-500 flex items-center border text-xs border-white hover:border-red-500 rounded py-1 px-2"
                    >
                         Delete
                    </button>
                </div>
            )}

            {model.type && model.type == "radio" && (
                <div className="flex "></div>
            )} */}
           
        </div>
    );
}
