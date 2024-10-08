import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import VillagerList from "./components/Villagers/VillagerList";
import VillagerDetail from "./components/Villagers/VillagerDetail";

import FishList from "./components/Fish/FishList";
import FishDetail from "./components/Fish/FishDetail";


import BugsList from "./components/Bugs/BugsList";
import BugsDetail from "./components/Bugs/BugsDetail";

import ClothingList from "./components/Clothing/ClothingList";
import RecipesList from "./components/Recipes/RecipesList";
import RecipesDetail from "./components/Recipes/RecipesDetail";

const Router = () => {
    return(
            <Routes>
                <Route path="/" element={<Home/>} /> 
                <Route path="/Villagers" element={<VillagerList/>} /> 
                <Route path="/Villagers/:id" element={<VillagerDetail/>}></Route>
                <Route path="/FishList" element={<FishList/>} />
                <Route path="/FishList/:id" element={<FishDetail/>}></Route>
                <Route path="/BugsList" element={<BugsList/>} />
                <Route path="/BugsList/:id" element={<BugsDetail/>} />


                <Route path="/ClothingList" element={<ClothingList/>}></Route>

                <Route path="/RecipesList" element={<RecipesList/>}></Route>
                <Route path="/RecipesList/:id" element={<RecipesDetail/>}></Route>
            </Routes>



    )
}
export default Router