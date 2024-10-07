import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Loading from "../loading";
import { Link } from "react-router-dom";
import Search from '../Search';


const ClothingList = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [searchTerm, setSearchTerm] = useState("");


    const fetchData = async () => {
        const URL = "https://api.nookipedia.com/nh/clothing"

        try{
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },
                
            });

            console.log(response); 
            setData(response.data)
        }catch (err) {
            setError(err.message);
        }finally{
            setLoading(false)
        }
    };
        useEffect(() => {
        fetchData(); 
    }, []);

    if (loading) return <Loading />; 
    if (error) return <div>{error}</div>; 

    // 검색된 데이터
    const searchedData = data.filter(clothing =>
        clothing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <>

        <div className='container'>
            <h1>옷 리스트</h1>
            <div className='search_area'>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <p className='filteredDataCount'>
                검색 결과 <span>{searchedData.length}</span> 개
            </p>
            <ul className='itemcard'>
                {searchedData.map((clothing) => ( 
                    <Link to={`/ClothingList/${clothing.id}`}>
                        <li key={clothing.id}>
                            <div className='personality_wrap'>
                                <span className='personality'>{clothing.personality}</span>
                            </div>
                            <img src={clothing.variations[0].image_url} alt={clothing.krKoName} />
                            <div className='itemcard_desc'>
                                <p>{clothing.name}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
        
        
        </>
    ) 
}

export default ClothingList