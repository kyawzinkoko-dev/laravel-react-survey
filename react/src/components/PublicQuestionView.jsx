import React from "react";

export default function PublicQuestionView({
    question = {},
    index = 0,
    answerChange,
}) {
    let selectedOptions = [];
    const onCheckBoxChange = (option, ev) => {
        if (ev.target.checked) {
            selectedOptions.push(option.text);
        } else {
            selectedOptions = selectedOptions.filter(
                (op) => op.id !== option.id
            );
        }
        answerChange(selectedOptions);
    };
    
    return (
        <>
            <fieldset className="mb-4">
               
                <div>
                    <legend className="font-semibold text-gray-900 text-base">
                        {index + 1} . {question.question}
                    </legend>
                    <p className="text-gray-500 text-sm">
                        {question.description}
                    </p>
                </div>
            </fieldset>
            <div className="mb-3 P">
                {question.type === "select" && (
                    <div>
                        <select onChange={(ev)=>answerChange(ev.target.value)} className="py-1 w-1/3 px-2 rounded focus:ring-indigo-500">
                            <option>Please Slect</option>
                            {question.data.options?.map((op, idx) => (
                                <option key={idx}>{op.text}</option>
                            ))}
                        </select>
                    </div>
                )}
                {question.type === "checkbox" &&
                    question.data.options?.map((option, idx) => (
                        <div className="flex items-center " key={idx}>
                            <input
                                id={question.id}
                                type="checkbox"
                                name={"question" + question.id}
                                onChange={(ev) => onCheckBoxChange(option, ev)}
                                className=" focus:ring-indigo-500 h-4 w-4 rounded-sm border-gray-500 text-indigo-500"
                            />
                            <label
                                htmlFor={question.id}
                                className="ml-3 block text-sm font-semibold  text-gray-700"
                            >
                                {option.text}
                            </label>{" "}
                        </div>
                    ))}
                {question.type === "radio" &&
                    question.data.options.map((check, idx) => (
                        <div className="flex" key={idx}>
                            <input
                                id={question.id}
                                type="radio"
                                name={"question" + question.id}
                                onChange={(ev) => answerChange(ev.target.value)}
                                className=" focus:ring-indigo-500 h-4 w-4 border-gray-500 shadow-sm text-indigo-500"
                            />
                            <label
                                htmlFor={question.id}
                                className="ml-3 block text-sm font-semibold text-gray-700"
                            >
                                {check.text}
                            </label>{" "}
                        </div>
                    ))}
                {question.type === "text" && (
                    <>
                        {/* <label htmlFor={question.id}>{question.question}</label> */}
                        <input
                            type="text"
                            onChange={(ev) => answerChange(ev.target.value)}
                            className="py-1 px-3 block w-full border border-gray-600 focus:border-indigo-500 focus:shadow mt-1  focus:ring-indigo-500 rounded text-gray-500"
                        />
                    </>
                )}
                {question.type === "textarea" && (
                    <textarea
                        className="rounded block w-full focus:shadow focus:ring-indigo-500 border text-gray-500 shadow-sm mt-1 border-gray-600 py-2 px-3 "
                        onChange={(ev) => answerChange(ev.target.value)}
                    ></textarea>
                )}
            </div>
            <hr className="mb-3 border-gray-600"/>
            
        </>
    );
}
