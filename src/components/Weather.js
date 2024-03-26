import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [weather, setWeather] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const cityInputRef = useRef(null)
  const API_KEY = 'b3ca27dcc18a718e57ad22d0d8799fba'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [])

  const getWeather = async () => {
    const city = cityInputRef.current.value
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      setWeather(response.data)

      const { coord } = response.data
      if (coord) {
        const timezoneResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=metric`);
        setCurrentDate(new Date(timezoneResponse.data.dt * 1000))
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }

  const getDayName = (date) => {
    const days = ['PAZAR', 'PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA', 'CUMARTESİ']
    return days[date.getDay()]
  };

  return (
    <div className='container'>
      <h1>Weather App</h1>
      <input type="text" ref={cityInputRef} />
      <button onClick={getWeather}>Get</button>
      <div>
        {weather && (
          <div>
            <h2>{weather.name}</h2>
            
            <p><b>{getDayName(currentDate)} {currentDate.toLocaleTimeString()}</b></p>
            <p><b>Şu An:</b> {weather.main.temp}°C</p>
            <p><b>Nem Oranı:</b> {weather.main.humidity}%</p>
          </div>
        )}
      <hr></hr>
      </div>
    </div>
  )
}

export default App