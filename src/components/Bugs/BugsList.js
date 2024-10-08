import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Loading from "../loading";
import { Link } from "react-router-dom";
import { creatures } from 'animal-crossing'; 

const BugsList = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchData = async () => {
        const URL = "https://api.nookipedia.com/nh/bugs"

        try{
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },                
            });

            const Bugs = response.data.map((bug) => {
            const krKoName = creatures.find(creature => creature.name === bug.name)?.translations.kRko || '';

            return {
                ...bug,
                krKoName,
            };
        });


            console.log(Bugs)

            console.log(response.data);
            setData(Bugs)
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

    return(
        <>

        <div className='container'>
            <h1>곤충 리스트</h1>
            <ul className='itemcard'>
                {data.map((bug) => ( 
                    <Link to={`/BugsList/${bug.id}`} key={bug.id}>
                        <li>
                            <div className='personality_wrap'>
                                <span className='personality'>{bug.personality}</span>
                            </div>
                            <img src={bug.image_url} alt={bug.name} />
                            <div className='itemcard_desc'>
                                <p>{bug.krKoName}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
        
        
        </>
    ) 
}

export default BugsList