import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from "../loading";
import { Link } from "react-router-dom";
import Header from '../Header';
import { recipes } from 'animal-crossing'; 
import Search from '../Search';

const RecipesList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        const URL = "https://api.nookipedia.com/nh/recipes";

        try {
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },
            });

            const recipesWithKoreanNames = response.data.map(recipeData => {
                const matchingRecipe = recipes.find(recipe => recipe.name === recipeData.name);
                // 한국어 이름을 가져오고, 없으면 기존 영어 이름 사용
                const krKoName = matchingRecipe?.translations?.kRko || recipeData.name; 

                return { ...recipeData, krKoName }; // 한국어 이름을 추가
            });

            setData(recipesWithKoreanNames);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    if (loading) return <Loading />; 
    if (error) return <div>{error}</div>; 

    // 검색된 데이터
    const searchedData = data.filter(recipe =>
        recipe.krKoName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
            <Header title="DIY"></Header>
            <div className='stiky'>
                <div className='search_area'>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <p className='filteredDataCount'>
                    검색 결과 <span>{searchedData.length}</span> 개
                </p>
            </div>

            <ul className='itemcard'>
    {searchedData.map((item) => ( 
        <Link to={`/RecipesList/${item.serial_id}`} key={item.serial_id}>
            <li>
                <div className='personality_wrap'>
                    <span className='personality'>{item.personality}</span>
                </div>
                <img src={item.image_url} alt={item.krKoName} />
                <div className='itemcard_desc'>
                    <p>{item.krKoName}</p>
                </div>
            </li>
        </Link>
    ))}
</ul>

        </div>
    ); 
}

export default RecipesList;
