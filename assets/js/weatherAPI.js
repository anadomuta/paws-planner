$(document).ready(function () {
  var APIKey = "8fa17f3bf5819b35e5514a16ea6de259";
  var searchButton = $("#searchButton");
  var cityInput = $("#locationInput");
  var currentWeather = $("#todayWeather");
  var weatherContainer = $(".weatherContainer");

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
        console.log(data);
        // Display current weather conditions for selected city
        weatherContainer.removeClass("d-none");
        currentWeather.empty();
        // Weather Icon
        var weatherTodayIcon = data.weather[0].icon;
        var todayIcon = `<img src="https://openweathermap.org/img/wn/${weatherTodayIcon}@2x.png"/>`;

        // Temperature conditions
        var tempCelsius = $("<p>");
        var tempInCelsius = data.main.temp;
        tempCelsius.text("Temp: " + tempInCelsius.toFixed(2) + "°C");

        // Wind conditions
        var wind = $("<p>");
        var windInKPH = data.wind.speed * 3.6;
        wind.text("Wind: " + windInKPH.toFixed(2) + " KPH");

        // Humidity conditions
        var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");

        // Append to HTML container
        currentWeather.append(todayIcon, tempCelsius, wind, humidity);
      });
  }

  searchButton.on("click", fetchCurrentWeather);
});
