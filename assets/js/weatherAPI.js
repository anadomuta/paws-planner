$(document).ready(function () {
  var APIKey = "8fa17f3bf5819b35e5514a16ea6de259";
  var searchButton = $("#searchButton");
  var cityInput = $("#locationInput");
  var currentWeather = $("#todayWeather");

  // Fetch current weather for a given city
  function fetchCurrentWeather() {
    var city = cityInput.val();
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric" +
      "&appid=" +
      APIKey;

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Display current weather conditions for selected city
        currentWeather.empty(); // Clear previous weather

        // Weather Icon
        var weatherTodayIcon = data.weather[0].icon;
        var todayIcon = `<img src="https://openweathermap.org/img/wn/${weatherTodayIcon}@2x.png"/>`;

        // Temperature conditions
        var tempInCelsius = data.main.temp;
        var tempCelsius = tempInCelsius.toFixed(1);

        // Wind conditions
        var windInKPH = data.wind.speed * 3.6;
        var wind = windInKPH.toFixed(1);

        // Humidity conditions
        var humidity = data.main.humidity;

        // Append to HTML container
        currentWeather.append(`
        <div class="border rounded-pill my-4" id="weatherIcon">${todayIcon}</div>
        <h4 class="my-2 mx-2"><i class="me-2 bi bi-thermometer-half" style="color: #A26769;"></i> ${tempCelsius} °C</h4>
        <h4 class="my-2 mx-2"><i class="me-2 bi bi-wind" style="color: #41576b;"></i> ${wind} km/h</h4>
        <h4 class="my-2 mb-4 mx-2"><i class="me-2 bi bi-droplet-half" style="color: #99B2DD;"></i>${humidity} %</h4>
        `);
      });
  }

  // Fetch current weather upon button click
  searchButton.on("click", fetchCurrentWeather);
});
