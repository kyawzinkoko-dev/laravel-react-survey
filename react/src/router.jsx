import {  createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Surveys from "./pages/Surveys";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import SurveyView from "./pages/SurveyView";
import SurveyPublicView from "./pages/SurveyPublicView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path:'/dashboard',
                element:<Navigate to='/'/>
            },
            {
                path:'/',
                element:<Dashboard/>
            },
            {
                path: "surveys",
                element: <Surveys />,
            },
            {
                path: "surveys/create",
                element: <SurveyView />,
            },
            {
                path:'survey/:id',
                element:<SurveyView/>
            }
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
        ],
    },
    {
        path:'/survey/public/:slug',
        element:<SurveyPublicView/>

    }
]);

export default router;
