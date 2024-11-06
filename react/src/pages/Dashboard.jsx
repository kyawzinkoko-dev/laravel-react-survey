import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/core/DashboardCard";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../axios";
import LoadingSpinner from "../components/LoadingSpinner";
import TButton from "../components/core/TButton";
import {  EyeIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/dashboard")
            .then(({ data }) => {
                setData(data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                return e;
            });
    }, []);
    console.log(data);
    return (
        <PageComponent title="Dashboard">
            {loading && <LoadingSpinner />}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3">
                    <DashboardCard
                        title="Total Survey"
                        className="order-1 lg:order-2"
                        style={{ animationDelay:'0.1s' }}
                    >
                        <div className="text-6xl flex-1 font-bold flex justify-center items-center text-center">
                            {data.total}
                        </div>
                    </DashboardCard>
                    <DashboardCard
                        title="Total Answers"
                        className="order-2 lg:order-4"
                        style={{ animationDelay:'0.2s' }}
                    >
                        <div className="text-6xl flex-1 font-bold flex justify-center items-center text-center">
                            {data.totalAnswer}
                        </div>
                    </DashboardCard>
                    <DashboardCard
                        title="Latest Survey"
                        className="order-3 lg:order-1 lg:row-span-2"
                        style={{ animationDelay:'0.3s' }}
                    >
                        {data.latestSurvey && (
                            <div>
                                <img
                                    src={data.latestSurvey.image}
                                    alt={`image_${data.latestSurvey.title}`}
                                    className="w-[240px] mx-auto"
                                />
                                <h3 className="text-xl font-bold mb-3">
                                    {data.latestSurvey.title}
                                </h3>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Created at: </div>
                                    <div>{data.latestSurvey.created_at}</div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Expire Date: </div>
                                    <div>{data.latestSurvey.expire_date}</div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Status: </div>
                                    <div>
                                        {data.latestSurvey.status
                                            ? "Active"
                                            : "Draft"}
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Questions: </div>
                                    <div>{data.latestSurvey.questions}</div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Answers: </div>
                                    <div>{data.latestSurvey.answers}</div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <TButton
                                        to={`survey/${data.latestSurvey.id}`}
                                    >
                                        <PencilIcon className="w-4 h-4 mr-2" />{" "}
                                        Edit Survey{" "}
                                    </TButton>
                                    <div>
                                        <TButton to="#" color="green">
                                            {" "}
                                            <EyeIcon className="w-4 h-4 mr-2" />{" "}
                                            View answers
                                        </TButton>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!data.latestSurvey && (
                            <div className="text-center font-semibold text-lg">
                                You {"don't"} have any answers
                            </div>
                        )}
                    </DashboardCard>
                    <DashboardCard title="Latest answers" className="order-4 lg:order-3 row-span-2"  style={{ animationDelay:'0.4s' }}>
                        {data.latestFiveAnswer?.map((d, index) => (
                            <div key={index} className="text-left">
                                <div className="font-semibold">
                                    {d.survey.title}
                                </div>
                                <small>
                                    Answer made at:{" "}
                                    <i className="font-semibold">
                                        {d.end_date}
                                    </i>
                                </small>
                            </div>
                        ))}
                        {!data.latestFiveAnswer?.length && (
                            <div className="text-center font-semibold py-12 text-gray-600">
                                You {"don't"} have answer yet
                            </div>
                        )}
                    </DashboardCard>
                </div>
            )}
        </PageComponent>
    );
}
