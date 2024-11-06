import React from "react";
import { useStateContext } from "../context/StateContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Toast = () => {
    const { toast,setToast } = useStateContext();
    const close = () =>{
        setToast({message:null,show:false})
    }
    return (
        <>
            {toast.show && (
                <div className="py-2 px-3 z-50 bg-emerald-500 text-white fixed right-2 rounded-sm bottom-2 w-1/3">
                    <div className="flex justify-between items-center">
                        {" "}
                        <span className="text-sm">{toast.message}</span>
                        <button onClick={close}>
                            {" "}
                            <XMarkIcon className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Toast;
