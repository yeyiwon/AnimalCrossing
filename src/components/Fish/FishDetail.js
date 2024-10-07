import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FishDetail = () => {

    const { id } = useParams(); 

    return(
        <>
            <h2> 물고기 디테일  </h2>
        
        </>
    )

}
export default FishDetail