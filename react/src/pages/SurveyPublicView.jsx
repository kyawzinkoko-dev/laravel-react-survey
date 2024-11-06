import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import LoadingSpinner from "../components/LoadingSpinner";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicView() {
    const { slug } = useParams();
    const [survey, setSurvey] = useState({});
    const [loading, setLoading] = useState(false);
    const [surveyFinished, setSurveyFinished] = useState(false);
    const answers = {};
    useEffect(() => {
        setLoading(true);
        axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
            setSurvey(data.data);
            setLoading(false);
        });
    }, []);

    const answerChanged = (question, val) => {
        answers[question.id] = val;
        console.log(answers);
    };
    console.log(answers);
    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post(`/survey/store-answer/${slug}`, { answers })
            .then(({ data }) => {
                console.log(data);
                setSurveyFinished(true);
            })
            .catch((e) => console.log(e.response));
        //  console.log(question);
    };
    return (
        <>
            {loading && <LoadingSpinner />}
            {!loading &&   (
                <form
                    onSubmit={onSubmit}
                    className="container mx-auto sm:my-7 my-4"
                >
                    <div className="grid grid-cols-6 gap-3">
                        <div>
                            <img
                                src={survey.image_url || ""}
                                alt={survey.title + "_image"}
                            />
                        </div>
                        <div className="col-span-5">
                            <h2 className="text-3xl font-bold mb-3">
                                {survey.title}
                            </h2>
                            <p className="text-gray-500 text-sm mb-3">
                                Expire Date : {survey.expire_date}
                            </p>
                            <p className="text-sm text-gray-500 mb-3">
                                {" "}
                                {survey.description}
                            </p>
                        </div>
                    </div>
                    {surveyFinished && (
                        <div className="flex items-center justify-center text-gray-700">
                            Thanks you for participation in the survey!
                        </div>
                    )}
                    {!surveyFinished && (
                        <>
                            {survey.questions?.map((q, idx) => (
                                <div key={q.id}>
                                    <PublicQuestionView
                                        question={q}
                                        index={idx}
                                        answerChange={(val) =>
                                            answerChanged(q, val)
                                        }
                                    />
                                </div>
                            ))}
                            <button
                                type="submit"
                                className=" inline-flex py-2 px-3 hover:shadow text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 rounded"
                            >
                                Submit
                            </button>
                        </>
                    )}
                </form>
            )}
        </>
    );
}
