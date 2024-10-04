import React from 'react';
// import { Typed } from 'react-typed';

const Loading = () => {
    return (
        <div className="loading_container">
        <div className="animate-bounce">
            <img src="./logo192.png" alt="Loading..." />
        </div>

        {/* <Typed
                strings={['LOADING ...']}
                typeSpeed={40}
                backSpeed={50}
                loop
                className="text-lg font-semibold text-gray-700"
            /> */}
        </div>
    );
};

export default Loading;
