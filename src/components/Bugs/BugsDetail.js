import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BugsDetail = () => {

    const { id } = useParams(); 

    return(
        <>
            <h2> 곤충 디테일  </h2>
        
        </>
    )

}
export default BugsDetail