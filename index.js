document.getElementById("getWeather").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("result");
  const apiKey = "f9de708312d65e65c0b1c669ade53773"; 

  if (!city) {
    resultDiv.innerHTML = `<p class="text-red-200"> Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    resultDiv.innerHTML = `
  <div class="flex flex-col items-center gap-2">
    <div class="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    <p class="text-white/80 text-sm">Fetching weather data...</p>
  </div>
`;


    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.log(error);
    
    resultDiv.innerHTML = `<p class="text-red-200">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const resultDiv = document.getElementById("result");
  
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  resultDiv.innerHTML = `
    <h2 class="text-2xl font-semibold">${data.name}, ${data.sys.country}</h2>
    <p class="text-4xl font-bold mt-2">${data.main.temp}°C</p>
    <p class="capitalize text-gray-200">${data.weather[0].description}</p>
    <div class="w-30 flex justify-center"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
  alt="${data.weather[0].description}" 
  class="w-20 h-20 mt-2" /></div>

    <div class="mt-4 space-y-1">
      <p> Humidity: ${data.main.humidity}%</p>
      <p> Wind Speed: ${data.wind.speed} m/s</p>
    </div>
  `;
  console.log(data);
  
}

document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

