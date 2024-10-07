import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Loading from '../loading'; 
import { Link } from 'react-router-dom';

const FishList = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchData = async () => { 
        const URL = "https://api.nookipedia.com/nh/fish";

        try {
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },
            });

            console.log(response.data); 
            
            setData(response.data);
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

    return (
        <div className='container'>
            <h1>물고기 리스트</h1>
            <ul className='itemcard'>
                {data.map((fish) => (
                    <Link to={`/FishList/${fish.id}`} key={fish.id}>
                        <li>
                            <div className='personality_wrap'>
                                <span className='personality'>{fish.personality}</span>
                            </div>
                            <img src={fish.image_url} alt={fish.krKoName} />
                            <div className='itemcard_desc'>
                                <p>{fish.name}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default FishList;
