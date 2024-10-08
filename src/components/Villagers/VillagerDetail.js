import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../loading';
import { villagers } from 'animal-crossing';

// 번역 데이터
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

const speciesKr = {
    "Hamster": "햄스터",
    "Dog": "개",
    "Cow": "소",
    "Squirrel": "다람쥐",
    "Koala": "코알라",
    "Rhinoceros": "코뿔소",
    "Rabbit": "토끼",
    "Hippo": "하마",
    "Eagle": "독수리",
    "Bull": "황소",
    "Pig": "돼지",
    "Kangaroo": "캥거루",
    "Gorilla": "고릴라",
    "Ostrich": "타조",
    "Deer": "사슴",
    "Monkey": "원숭이",
    "Horse": "말",
    "Bear cub": "아기곰",
    "Bear": "곰",
    "Chicken": "닭",
    "Cat": "고양이",
    "Tiger": "호랑이",
    "Octopus": "문어",
    "Alligator": "악어",
    "Anteater": "개미핥기",
    "Penguin": "펭귄",
    "Bird": "새",
    "Goat": "염소",
    "Frog": "개구리",
    "Sheep": "양",
    "Duck": "오리",
    "Mouse": "생쥐",
    "Wolf": "늑대",
    "Elephant": "코끼리",
    "Lion": "사자"
};

// 월 한글 변환
const monthKr = {
    "January": "1월",
    "February": "2월",
    "March": "3월",
    "April": "4월",
    "May": "5월",
    "June": "6월",
    "July": "7월",
    "August": "8월",
    "September": "9월",
    "October": "10월",
    "November": "11월",
    "December": "12월",
};

// 성별 한글 변환
const genderKr = {
    "Male": "남자",
    "Female": "여자",
};

// 스타일 한글 변환
const favStylesKr = {
    "Active": "스포츠",
    "Cool": "멋쟁이",
    "Cute": "깜찍함",
    "Elegant": "우아함",
    "Gorgeous": "화려함",
    "Simple": "심플함",
};

// 색깔 한글 변환
const favColorsKr = {
    "Aqua": "아쿠아",
    "Beige": "베이지",
    "Black": "블랙",
    "Blue": "블루",
    "Brown": "브라운",
    "Colorful": "컬러풀",
    "Gray": "그레이",
    "Green": "그린",
    "Orange": "오렌지",
    "Pink": "핑크",
    "Purple": "퍼플",
    "Red": "레드",
    "White": "화이트",
    "Yellow": "옐로우",
    "Natural wood": "내추럴우드",
    "Dark wood": "다크우드",
};

// 취미 한글 변환
const hobbyKr = {
    "Education": "공부하기",
    "Fashion": "쇼핑하기",
    "Fitness": "운동하기",
    "Music": "음악듣기",
    "Nature": "자연을 만끽하기",
    "Play": "놀기",
};

const VillagerDetail = () => {
    const { id } = useParams();

    const [villager, setVillager] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVillagerData = async () => {
        const URL = "https://api.nookipedia.com/villagers?nhdetails=true";
        try {
            const response = await axios.get(URL, {
                headers: {
                    "X-API-KEY": process.env.REACT_APP_API_KEY,
                    "Accept-Version": "1.0.0",
                },
            });
            console.log(id);
            
            // 주민 정보 찾기
            const selectedVillager = response.data.find(v => v.id === id); 
            if (selectedVillager) {
                // 한글 이름과 성격 변환
                const krKoName = villagers.find(v => v.name === selectedVillager.name)?.translations.kRko || selectedVillager.name;
                const personality = personalityKr[selectedVillager.personality] || selectedVillager.personality;

                const species = speciesKr[selectedVillager?.species] || selectedVillager?.species;

                const birthMonth = monthKr[selectedVillager?.birthday_month] || selectedVillager?.birthday_month; // 한국어 월
                const gender = genderKr[selectedVillager?.gender] || selectedVillager?.gender; // 한국어 성별

                // 변환된 정보로 업데이트
                setVillager({ 
                    ...selectedVillager, 
                    krKoName, 
                    personality, 
                    species, 
                    birthMonth, 
                    gender,
                    hobby: hobbyKr[selectedVillager.nh_details.hobby] || selectedVillager.nh_details.hobby,
                    favColors: selectedVillager.nh_details.fav_colors.map(color => favColorsKr[color] || color).join(', '),
                    favStyles: selectedVillager.nh_details.fav_styles.map(style => favStylesKr[style] || style).join(', '),
                });
            } else {
                setError("해당 주민을 찾을 수 없습니다.");
            }

        } catch (error) {
            setError("주민 정보를 가져오는 데 실패했습니다. " + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVillagerData();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;
    if (!villager) return <div>주민 정보를 찾을 수 없습니다.</div>;

    return (
        <div className='detailpage'>
            <div className='detailCard'> 
                <div className='detailImg'>
                    <img src={villager.image_url} alt={villager.name} />
                </div>
                <div className='detailCarddesc'>
                <h2 className='detailName'>
                <img src={villager.nh_details.icon_url} alt="" />
                        {villager.krKoName}
                </h2>
                    <p>성격 <span>{villager.personality}</span></p>
                    <p>성별 <span>{villager.gender}</span></p>
                    <p>종 <span>{villager.species}</span></p>
                    <p>생일 <span>{villager.birthMonth} {villager.birthday_day}일</span></p>
                    <p>취미 <span>{villager.hobby}</span></p>
                    <p>선호 색깔 <span>{villager.favColors}</span></p>
                    <p>선호 스타일 <span>{villager.favStyles}</span></p>
                </div>
            </div>

            <div className='house_img_wrap'>
                <div className='house_img_box'>
                    <span> 집 외부</span>
                    <img className='house_img' src={villager.nh_details.house_exterior_url} alt={villager.name} />
                </div>
                <div className='house_img_box'>
                    <span>집 내부</span>
                    <img className='house_img' src={villager.nh_details.house_interior_url} alt={villager.name} />
                </div>
            </div>
        </div>
    );
};

export default VillagerDetail;
