import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import VillagerList from "./components/Villagers/VillagerList";

import Fish from "./components/Fish/Fish";
import Bugs from "./components/Bugs/Bugs";

const Router = () => {
    return(
            <Routes>
                <Route path="/" element={<Home/>} /> 
                <Route path="/Villagers" element={<VillagerList/>} /> 
                <Route path="/Fish" element={<Fish/>} />
                <Route path="/Bugs" element={<Bugs/>} />
            </Routes>



    )
}
export default Router