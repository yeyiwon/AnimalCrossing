import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { villagers } from 'animal-crossing';
import Loading from '../loading';
import Search from '../Search';
import { Link } from 'react-router-dom';

import Header from '../Header';

const personalityKr = {
    Smug: "느끼함",
    Sisterly: "단순활발",
    Lazy: "먹보",
    Cranky: "무뚝뚝",
    Snooty: "성숙함",
    Peppy: "아이돌",
    Jock: "운동광",
    Normal: "친절함",
};


const personalities = Object.keys(personalityKr);

const VillagerList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPersonality, setSelectedPersonality] = useState("");

    const fetchData = async () => {
        const URL = "https://api.nookipedia.com/villagers?nhdetails=true";

        try {
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },
            });

            const animal = villagers.map(villager => {
                const krKoName = villager.translations.kRko; 
                const villagerData = response.data.find(data => data.name === villager.name);
                const personality = personalityKr[villagerData?.personality] || villagerData?.personality;
            
                return { ...villagerData, krKoName, personality,  };
            });

            setData(animal);
            console.log(animal);
        } catch (error) {
            setError("데이터를 가져오는 데 실패했습니다.");
            console.error(error);
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
    const searchedData = data.filter(villager =>
        villager.krKoName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 필터링된 데이터
    const filteredData = selectedPersonality === ""
        ? searchedData
        : searchedData.filter(villager => villager.personality === selectedPersonality);

    return (
        <div className='container'>
            <Header title="주민"></Header>
            <div className='stiky'>
                <div className='search_area'>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className='personality_tabs'>
    <button
        className={`tabs_btn ${selectedPersonality === "" ? "selected" : ""}`} 
        onClick={() => setSelectedPersonality("")}
    >
        전체
    </button>
    {personalities.map(personality => (
        <button
            key={personality}
            className={`tabs_btn ${selectedPersonality === personalityKr[personality] ? "selected" : ""}`}
            onClick={() => setSelectedPersonality(personalityKr[personality])}
        >
            {personalityKr[personality]}
        </button>
    ))}
</div>

            <p className='filteredDataCount'>
                검색 결과 <span>{filteredData.length}</span> 마리
            </p>
            </div>

            <ul className='itemcard'>
                {filteredData.map((villager) => (
                    <Link to={`/Villagers/${villager.id}`} key={villager.id}>
                        <li>
                            <div className='personality_wrap'>
                                <span className='personality'># {villager.personality}</span>
                            </div>
                            <img src={villager.image_url} alt={villager.krKoName} />
                            <div className='itemcard_desc'>
                                <p>{villager.krKoName}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default VillagerList;
