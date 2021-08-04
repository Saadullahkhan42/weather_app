const citySearch = document.querySelector("form");
const weatherDetails = document.querySelector(".detail");
const timeImage = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = async (city) => {
  const cityDet = await searchCity(city);
  const weather = await getWeather(cityDet.Key);

  const html = `<h4 class="my-3">${cityDet.EnglishName}</h4>
                <h4 class="my-2">${weather.WeatherText}</h4>
                <div class="display-3 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>`;
  weatherDetails.innerHTML = html;

  if (weather.IsDayTime) {
    timeImage.setAttribute("src", "./day.svg");
  } else {
    timeImage.setAttribute("src", "./night.svg");
  }
  const weatherIcon = `./icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", weatherIcon);
};

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = citySearch.city.value.trim();
  citySearch.reset();

  updateUI(city)
    .then((data) => {
      console.log("Request successfully");
    })
    .catch((err) => console.log(err));
});
