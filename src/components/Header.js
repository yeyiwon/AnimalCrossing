import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Header = ({ title }) => {


    const navigate = useNavigate();

    const FuncBack = () => {
        navigate(-1);
    }

    return (
        <header className="header">
            
            <button 
            onClick={FuncBack}
            >
            <IoMdArrowRoundBack size={22}/> 
            </button>

            <h2>{title}</h2>
            <div></div>
        </header>
    );
};

export default Header
