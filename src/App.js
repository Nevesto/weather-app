import React, { useEffect, useState } from 'react';
import './App.css';
import Box from './main/main';

function App() {
  const handleWeatherUpdate = (weather, hour) => {
    const body = document.body;
    body.classList.remove('background-normal-dia', 'background-normal-noite', 'background-chuva-dia', 'background-chuva-noite');

    if (weather.includes('chuva')) {
      if (hour >= 19 || hour < 6) {
        body.classList.add('background-chuva-noite');
      } else {
        body.classList.add('background-chuva-dia');
      }
    } else {
      if (hour >= 19 || hour < 6) {
        body.classList.add('background-normal-noite');
      } else {
        body.classList.add('background-normal-dia');
      }
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    handleWeatherUpdate('', hour);
  }, []);

  return (
    <div className="App">
      <Box onWeatherUpdate={handleWeatherUpdate} />
    </div>
  );
}

export default App;