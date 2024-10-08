import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Loading from '../loading'; 
import { creatures } from 'animal-crossing';

const FishList = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchData = async () => { 
        const URL = "https://api.nookipedia.com/nh/fish";

        try{
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },                
            });

            const Fish = response.data.map((fish) => {
            const krKoName = creatures.find(creature => creature.name === fish.name)?.translations.kRko || '';
                
            return {
                ...fish,
                krKoName,
            };
        });

        console.log(Fish)

        console.log(response.data);
        setData(Fish)


        } catch (err) {
            setError(`데이터를 불러오는 데 오류가 발생했습니다: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    if (loading) return <Loading />; 
    if (error) return <div>{error}</div>; 

    return (
        <div className='container'>
            <h1>물고기 리스트</h1>
            <ul className='itemcard'>
                {data.map((fish) => (
                    <li key={fish.number}>
                        <img src={fish.image_url} alt={fish.krKoName} />
                        <div className='itemcard_desc'>
                            <p>{fish.krKoName} </p>
                            <span>{fish.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FishList;
