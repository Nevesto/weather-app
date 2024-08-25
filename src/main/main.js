import React, { useState } from 'react';
import './main.css';

function Box({ onWeatherUpdate }) {
    const [input, setInput] = useState('');
    const [name, setName] = useState('');
    const [temp, setTemp] = useState(null);
    const [weather, setWeather] = useState('');
    const [country, setCountry] = useState('');
    const [vento, setVento] = useState('');
    const [umidade, setUmidade] = useState('');

    const handleSearch = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=60d2c284bc18f831c8f6205ebd5dcb42&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            setTemp(json.main.temp);
            setWeather(json.weather[0].description);
            setCountry(json.sys.country);
            setVento(json.wind.speed);
            setName(json.name);
            setUmidade(json.main.humidity);
            onWeatherUpdate(json.weather[0].description, new Date().getHours());
        } else {
            console.error('City not found');
        }
    };

    return (
        <div className="main">
            <h1>Weather App</h1>

            <div className="search-box">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>

            {temp !== null && (
                <div className="weather-box">
                    <div className='country'>{name}, {country}</div>
                    <div className='info'>
                        <div className="label">
                            <div className="temp">
                                <div className='tittle'>Temperatura:</div>
                                <div className='tempInfo font-size'>{temp} ºC</div>
                            </div>
                            <div className="vento">
                                <div className='tittle'>Vento:</div>
                                <div className='ventoInfo font-size'>{vento} m/s</div>
                            </div>
                        </div>
                        <div className="label">
                            <div className="weather">
                                <div className='tittle'>Tempo:</div>
                                <div className='weatherInfo font-size'>
                                    {weather}
                                </div>
                            </div>
                            <div className='humidity'>
                                <div className='tittle'>Umidade:</div>
                                <div className='humidityInfo font-size'>{umidade}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Box;