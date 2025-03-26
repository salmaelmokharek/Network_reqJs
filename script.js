const API_KEY = '51d4f2ba85f166babce54ef71d3a3bdf'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert('Error: ' + error.message);
            clearWeather();
        });
}

function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function clearWeather() {
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';
}

// Add enter key support
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});