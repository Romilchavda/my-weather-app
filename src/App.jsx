import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // <--- Yahan apni API Key dalein

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === "404") {
        alert("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white text-center">
        <h1 className="text-3xl font-bold mb-6">Weather App</h1>
        
        {/* Search Box */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Enter city name..."
            className="flex-1 p-3 rounded-xl bg-white/10 outline-none border border-white/20 placeholder-white/70"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button 
            onClick={fetchWeather}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl transition-all shadow-lg"
          >
            🔍
          </button>
        </div>

        {loading && <p className="animate-pulse">Fetching data...</p>}

        {weather && (
          <div className="animate-fadeIn">
            <h2 className="text-4xl font-semibold">{weather.name}</h2>
            <p className="text-lg opacity-80 uppercase tracking-widest">{weather.weather[0].description}</p>
            
            <div className="my-6">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                alt="weather icon"
                className="mx-auto w-32"
              />
              <h3 className="text-6xl font-black">{Math.round(weather.main.temp)}°C</h3>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <p className="text-sm opacity-70">Humidity</p>
                <p className="text-xl font-bold">{weather.main.humidity}%</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <p className="text-sm opacity-70">Wind Speed</p>
                <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}

        {!weather && !loading && (
          <p className="text-white/60">Search for a city to see the magic! ✨</p>
        )}
      </div>
    </div>
  );
}

export default App;