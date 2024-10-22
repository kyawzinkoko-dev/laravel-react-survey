import React from "react";
import PageComponent from "../components/PageComponent";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import TButton from "../components/core/TButton";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";
import SurveyQuestion from "./SurveyQuestion";

export default function SurveyView() {
    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: [],
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const onImageChoose = (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...survey };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        console.log(payload);
        axiosClient
            .post("/survey", payload)
            .then((res) => {
                console.log(res);
                navigate("/surveys");
            })
            .catch((e) => {
                if (e.response.data) {
                    console.log(e.response);
                    setError(e.response.data.message);
                }
            });
    };

    const onSurveyUpdate = (questions) => {
        setSurvey({ ...survey, questions });
    };
    return (
        <PageComponent title="Create Survey">
            <form
                action="#"
                method="POST"
                className="bg-white"
                onSubmit={handleSubmit}
            >
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-whie px-4 py-5 sm:p-6">
                      
                        {error && (
                            <div className="bg-red-500 text-white py-2 px-3">
                                {error}
                            </div>
                        )}

                        {/* Image */}
                        <div>
                            <label className="text-sm block font-medium text-gray-700">
                                Photo
                            </label>
                            <div className="mt-1 flex items-center">
                                {survey.image_url && (
                                    <img
                                        src={survey.image_url}
                                        alt=""
                                        className="w-32 h-32 object-cover"
                                    />
                                )}
                                {!survey.image_url && (
                                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                        <PhotoIcon className="w-8 h-8" />
                                    </span>
                                )}
                                <button
                                    type="button"
                                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <input
                                        type="file"
                                        className="absolute opacity-0 left-0 right-0 bottom-0 top-0 cursor-pointer"
                                        onChange={onImageChoose}
                                    />
                                    Change
                                </button>
                            </div>
                        </div>
                        {/* //image */}
                        {/* Title  */}
                        <div className="col-span-6 sm:col-span-3 ">
                            <label className="block text-sm font-medium text-gray-700">
                                Survey Title
                            </label>
                            <input
                                type="text"
                                value={survey.title}
                                placeholder="Survey Title"
                                className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 sm:text-sm focus:outline-none focus:ring-indigo-500"
                                onChange={(e) =>
                                    setSurvey({
                                        ...survey,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/* //Title */}
                        {/* Description  */}
                        <div className="col-span-6 sm:col-span-3 ">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                type="text"
                                value={survey.description}
                                placeholder="Description"
                                className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 sm:text-sm focus:outline-none focus:ring-indigo-500"
                                onChange={(e) =>
                                    setSurvey({
                                        ...survey,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/* Description */}
                        {/* Expire Date */}
                        <div className="col-span-6 sm:col-span-3 ">
                            <label className="block text-sm font-medium text-gray-700">
                                Expire Date
                            </label>
                            <input
                                type="date"
                                value={survey.expire_date}
                                placeholder="Expire Date"
                                className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 sm:text-sm focus:outline-none focus:ring-indigo-500"
                                onChange={(e) =>
                                    setSurvey({
                                        ...survey,
                                        expire_date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/* Expire Date */}
                        {/* Active */}
                        <div className="flex items-center">
                            <div className="flex h-5 items-center">
                                <input
                                    type="checkbox"
                                    checked={survey.status}
                                    className=" h-4 w-4 rounded border-gray-300 text-indigo-600 foucs:ring-indigo-600 sm:text-sm focus:outline-none focus:ring-indigo-500"
                                    onChange={(e) =>
                                        setSurvey({
                                            ...survey,
                                            status: e.target.checked,
                                        })
                                    }
                                />
                            </div>
                            <div className="ml-3 text-sm ">
                                <label
                                    htmlFor="comments"
                                    className="font-medium text-gray-700"
                                >
                                    Active
                                </label>
                                <p className="text-gray-500">
                                    Whether to make survey publicly avaliable
                                </p>
                            </div>
                        </div>
                        {/* //Active */}
                        <SurveyQuestion
                            questions={survey.questions}
                            onQuestionUpdate={onSurveyUpdate}
                        />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <TButton>Save</TButton>
                    </div>
                </div>
            </form>
        </PageComponent>
    );
}
