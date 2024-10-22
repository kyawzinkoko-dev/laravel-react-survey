import React, { useState } from "react";
import PageCompoment from "../components/PageComponent";
import { useAuthContext } from "../context/AuthContext";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import axosClient from "../axios";

const Surveys = () => {
    //const {surveys}= useAuthContext()
    const [surveys, setSurvey] = useState([]);
    console.log(surveys);
    const onDeleteClick = () => {
        console.log("on delte click ");
    };
    useEffect(() => {
        axosClient
            .get("survey")
            .then(({ data }) => {
                console.log(data);
                setSurvey(data)
            })
            .catch((e) => console.log(e));
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys.map((survey) => (
                    <SurveyListItem
                        key={survey.id}
                        survey={survey}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
            </div>
        </PageCompoment>
    );
};

export default Surveys;
