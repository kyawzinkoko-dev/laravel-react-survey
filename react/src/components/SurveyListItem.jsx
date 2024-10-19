import React from "react";
import {
    ArrowTopRightOnSquareIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import TButton from "./core/TButton";

export default function SurveyListItem({ survey,onDeleteClick }) {
    return (
        <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
            <img
                src={survey.image_url}
                alt={survey.title}
                className="w-full object-cover h-48"
            />
            <h4 className="mt-4 font-bold text-lg ">{survey.title}</h4>
            <div
                dangerouslySetInnerHTML={{ __html: survey.description }}
                className="flex-1 overflow-hidden"
            ></div>
            <div className="flex justify-between items-center mt-5">
                <TButton to={`survey/${survey.id}`}>
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Edit
                </TButton>
            
            <div className="flex items-center">
                <TButton to={`survey/${survey.id}`} circle link>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </TButton>
                {survey.id && (
                    <TButton onClick={onDeleteClick} circle link color="red">
                        <TrashIcon className="h-5 w-5" />
                    </TButton>
                )}
            </div>
            </div>
        </div>
    );
}
