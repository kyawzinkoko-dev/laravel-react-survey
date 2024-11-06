import React, { useState } from "react";
import PageCompoment from "../components/PageComponent";
import { useStateContext } from "../context/StateContext";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import axosClient from "../axios";
import PaginationLink from "../components/PaginationLink";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosClient from "../axios";
import Toast from "../components/Toast";

const Surveys = () => {
    const {showToast}= useStateContext()
    const [surveys, setSurvey] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});

    const onDeleteClick = (id) => {
        if (!id) return;
        if (window.confirm("Are you sure you want to delete survey")) {
            setLoading(true);
            axiosClient
                .delete(`/survey/${id}`)
                .then(({ data }) => {
                    showToast("Survey Deleted Successfully")
                    getSurvey();
                    setLoading(false);
                })
                .catch((e) => console.log(e));
        }
    };

    const getSurvey = (url) => {
        url = url || "survey";
        setLoading(true);
        axosClient
            .get(url)
            .then(({ data }) => {
                console.log(data);
                setSurvey(data.data);
                setMeta(data.meta);
                setLoading(false);
            })
            .catch((e) => console.log(e));
    };

    const onPageClick = (link) => {
        getSurvey(link.url);
    };
    useEffect(() => {
        getSurvey();
    }, []);
    return (
        <PageCompoment
            title="Surveys"
            button={
                <TButton color="green" to="/surveys/create">
                    <PlusCircleIcon className="h-6 w-6 mr-2" /> Creat Survey
                </TButton>
            }
        >
            {loading && <LoadingSpinner />}
            {!loading && (
                <div>
                    {surveys.length === 0 && (
                        <div className="flex justify-center items-center sm:text-xl  ">You don't have any survey</div>
                    )}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {surveys.length >0 && surveys.map((survey) => (
                            <SurveyListItem
                                key={survey.id}
                                survey={survey}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>

                    {surveys.length > 0 && <PaginationLink meta={meta} onPageClick={onPageClick} />}
                    <Toast />
                </div>
            )}
        </PageCompoment>
    );
};

export default Surveys;
