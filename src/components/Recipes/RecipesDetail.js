import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../loading';
import Header from '../Header';
import { recipes } from 'animal-crossing'; 

const RecipesDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemsList, setItemsList] = useState([]);

    // 아이템 리스트를 가져오는 함수
    const fetchItemsList = async () => {
        const URL = "https://api.nookipedia.com/nh/items"; // 전체 아이템 리스트 URL

        try {
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },
            });
            //  console.log("아이템 리스트: ", response.data);
            return response.data; // 아이템 리스트 반환
        } catch (err) {
            console.error(err);
            return null; // 오류 발생 시 null 반환
        }
    };

    // 레시피 정보를 가져오는 함수
    const fetchRecipeDetail = async () => {
        const URL = "https://api.nookipedia.com/nh/recipes";

        try {
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },
            });

            const selectRecipe = response.data.find(R => R.serial_id === parseInt(id));

            if (selectRecipe) {
                const krKoName = recipes.find(R => R.name === selectRecipe.name)?.translations.kRko || selectRecipe.name;
                setRecipe({ ...selectRecipe, krKoName });
            } else {
                setError("레시피를 찾을 수 없습니다.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 아이템 리스트를 불러온 후 재료 세부 정보 확인
    const checkMaterialDetails = async () => {
        const itemsData = await fetchItemsList();
        if (itemsData) {
            setItemsList(itemsData);
        }

        // 레시피에 포함된 재료 확인
        if (recipe && recipe.materials) {
            const materialsWithDetails = recipe.materials.map(material => {
                const matchingItem = itemsData.find(item => item.name === material.name);
                return {
                    ...material,
                    details: matchingItem || null, // 일치하는 아이템이 있으면 추가
                };
            });
            setRecipe(prev => ({ ...prev, materials: materialsWithDetails })); // 재료에 세부 정보 추가
        }
    };

    useEffect(() => {
        fetchRecipeDetail();
    }, [id]);

    useEffect(() => {
        if (recipe) {
            checkMaterialDetails(); // 레시피가 로드된 후 재료 확인
        }
    }, [recipe]); 

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    return (
        <div className='container'>
            <Header title={recipe?.krKoName || "레시피 상세보기"} />
            {recipe && (
                <div>
                    <img src={recipe.image_url} alt={recipe.name} />
                    <h2>{recipe.krKoName}</h2>
                    <h3>제작 방법:</h3>
                    <ul>
                        {recipe.materials.map((material, index) => (
                            <li key={index}>
                                {material.name}: {material.count}개 
                                {material.details && (
                                    <div>
                                        <p>설명: {material.details.description}</p>
                                        <img src={material.details.image_url} alt={material.name} style={{ width: '50px' }} />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipesDetail;
