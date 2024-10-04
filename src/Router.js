import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import VillagerList from "./components/Villagers/VillagerList";

const Router = () => {
    return(
            <Routes>
                <Route path="/" element={<Home/>} /> 
                <Route path="/Villagers" element={<VillagerList/>} /> 
            </Routes>



    )
}
export default Router