// dashboard.js

document.addEventListener('DOMContentLoaded', async () => {
    const greetingElement = document.getElementById('greeting');
    const userLocationElement = document.getElementById('userLocation');
    const weatherInfoElement = document.getElementById('weatherInfo');
    const weatherMessageElement = document.getElementById('weatherMessage');
  
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('email');
    greetingElement.textContent = `Hello, ${userEmail}!`;
  
    try {
    const { latitude, longitude, location, city, country, timezone, currency } = await getUserLocation();
    const weatherData = await fetchWeather(latitude, longitude);
    userLocationElement.textContent = `Your Location: ${location}, ${city}, ${country}`;
    weatherInfoElement.textContent = `Weather: ${weatherData.description}, Temperature: ${weatherData.temperature}°C, Timezone: ${timezone}, Currency: ${currency}`;
  
      // Show personalized messages based on weather conditions
      showWeatherMessage(weatherData, weatherMessageElement);
    } catch (error) {
      console.error('Error fetching weather information:', error);
    }
  });
  
  async function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const apiKey = '097c2064b6384765a26191c151fa1527';

                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        const result = data.results[0];

                        if (result) {
                            const location = result.formatted
                            
                            const locationDetails = {
                                latitude,
                                longitude,
                                location,
                                city: result.components.city || 'Unknown City',
                                country: result.components.country || 'Unknown Country',
                                timezone: result.annotations.timezone.name || 'Unknown Timezone',
                                currency: result.annotations.currency.name || 'Unknown Currency'
                            };

                            resolve(locationDetails);
                        } else {
                            reject(new Error('Location data not found'));
                        }
                    })
                    .catch(error => reject(error));
            },
            (error) => reject(error)
        );
    });
}

  async function fetchWeather(latitude, longitude) {
    const apiKey = 'd320390d8dd2621215067632c95bc3c0'; // Replace with your actual OpenWeatherMap API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    const data = await response.json();
  
    return {
      description: data.weather[0].description,
      temperature: data.main.temp,
    };
  }
  
  function showWeatherMessage(weatherData, messageElement) {
    if (weatherData.temperature < 10) {
      messageElement.textContent = 'It\'s cold outside. Consider wearing a jacket.';
    } else if (weatherData.temperature > 25) {
      messageElement.textContent = 'It\'s hot outside. Consider wearing light clothing.';
    } else {
      messageElement.textContent = 'Enjoy the weather!';
    }
  }
