import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Backbtn = () => {

    const navigate = useNavigate();

    const FuncBack = () => {
        navigate(-1);
    }

    return(
        <div>
            <button 
            onClick={FuncBack}
            >
            <IoMdArrowRoundBack size={24}/> 
            </button>
        </div>


    )

}

export default Backbtn