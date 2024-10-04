import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div className="homebox">
            <h1 style={{ textAlign: "center" }}>
                <img src="./logo192.png" alt="" />
            </h1>

            <div className="homebtnbox"> 
                <ul className="homebtnboxUl">
                    <li>
                        <Link to="/Villagers"> 주민 </Link>
                    </li>
                    <li>
                        <Link to="/Villagers"> 곤충 </Link>
                    </li>
                    <li>
                        <Link to="/Villagers"> 물고기 </Link>
                    </li>
                    <li>
                        <Link to="/Villagers"> 옷 </Link>
                    </li>
                    <li>
                        <Link to="/Villagers"> DIY  레시피 </Link>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}

export default Home