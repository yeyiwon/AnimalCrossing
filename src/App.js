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
      <div style={{ marginTop: '62px' }}>
        <Router />

      </div>
      
    </div>
  );
}

export default App;
