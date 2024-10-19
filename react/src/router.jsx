import { BrowserRouter, createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Surveys from "./pages/Surveys";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import SurveyView from "./pages/SurveyView";

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
]);

export default router;
