import './App.css';
import React from 'react';
import Router from './Router';
import Backbtn from './BackBtn';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <Backbtn/>
      </div>
      
      <Router />
    </div>
  );
}

export default App;
