document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://geocode.search.hereapi.com/v1/geocode";
  const apiKeyGeo = "RQsjWkadZwLvAyUu3XQzmATwlTXAmVQFvpHX1xAHFXU";
  const apiKeyPlaces = "fe9a326d269345a4b9e1136bfdae6a47";
  const apiKeyWeather = "8fa17f3bf5819b35e5514a16ea6de259";

  // Function to fetch data from Mapping API
  async function fetchData(location) {
      try {
          const response = await fetch(`${apiUrl}?q=${location}&limit=4&apiKey=${apiKeyGeo}`);
          if (response.ok) {
              const data = await response.json();
              const lon = data.items[0].position.lng;
              const lat = data.items[0].position.lat;

              moveMapToLocation(map, lat, lon);
              fetchPlaces(lon, lat);
              fetchCurrentWeather(location);
          } else {
              console.error("Failed to fetch data. Status:", response.status);
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }

  // Function to display location of searched city on the map
  function moveMapToLocation(map, lat, lon) {
      map.setCenter({ lat: lat, lng: lon });
      map.setZoom(12);
  }

  // Function to fetch places using lat and lon from previous API
  function fetchPlaces(lon, lat) {
      // Clear existing cards/filters if present
      $("#activeCategories").empty();
      $("#eatCardContainer").empty();
      $("#noResults").addClass("d-none");
      $("#loadingStatus").removeClass("d-none");

      var categories = ["pet"]; // an array of categories user wants to search for
      var radius = "10000";

      var queryURLPlaces = `https://api.geoapify.com/v2/places?categories=${categories.join(",")}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&lang=en&limit=20&apiKey=${apiKeyPlaces}`;

      fetch(queryURLPlaces)
          .then(function (response) {
              return response.json();
          })
          .then(function loadCards(result) {
              console.log(result);
              // if there are no results, inform user
              if (result.features.length === 0) {
                  $("#loadingStatus").addClass("d-none");
                  $("#noResults").removeClass("d-none");
              }
              result.features.forEach((searchResult) => {
                  console.log("Adding result to page...");
                  var eatName = searchResult.properties.name || "Unknown";
                  var eatLocation = searchResult.properties.address_line2 || "Unknown";
                  var eatWebsiteLink = searchResult.properties.datasource.raw.website || null;
                  var isEatLink = eatWebsiteLink ? "Visit website" : "No website";
                  var eatOpeningHrs = searchResult.properties.datasource.raw.opening_hours || "Unknown";
                  var eatWheelchair = searchResult.properties.datasource.raw.wheelchair || "Unknown";
                  var eatDistance = searchResult.properties.distance;
                  var isDisabled = eatWebsiteLink ? "" : "disabled";
                  var isAriaDisabled = eatWebsiteLink ? "false" : "true";

                  // Add pin to the map
                  addPinToMap(searchResult.properties.lat, searchResult.properties.lon, eatName);

                  $("#eatCardContainer").append(`
                      <div class="card rounded mx-1 col-5 col-lg-4">
                          <div class="card-body">
                              <p class="monoText my-0"><i class="bi bi-person-walking me-2"></i>${eatDistance}m</p>
                              <h5 class="card-title mb-4">${eatName}</h5>
                              <h6 class="card-subtitle mb-2 text-body-secondary"><i class="bi bi-geo-alt-fill me-2"></i>${eatLocation}</h6>
                              <p class="my-0 monoText"><i class="bi bi-clock me-2"></i>${eatOpeningHrs}</p>
                              <p class="my-0 monoText"><i class="bi bi-person-wheelchair me-2"></i>${eatWheelchair}</p>
                              <a target="_blank" href="${eatWebsiteLink}" class="btn btn-sm btn-primary rounded-pill mt-2 py-1 ${isDisabled}" aria-disabled="${isAriaDisabled}"><p class="my-0 monoText">${isEatLink}</p></a>
                          </div>
                      </div>
                  `);
              });
              $("#loadingStatus").addClass("d-none");
          })
          .catch((error) => console.log("error", error));
  }

  // Function to fetch current weather for a given city
  function fetchCurrentWeather(city) {
      var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}`;

      fetch(queryURL)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              // Display current weather conditions for selected city
              const currentWeather = $("#todayWeather");
              currentWeather.empty();

              const weatherTodayIcon = data.weather[0].icon;
              const todayIcon = `<img src="https://openweathermap.org/img/wn/${weatherTodayIcon}@2x.png"/>`;
              const tempCelsius = data.main.temp.toFixed(1);
              const wind = (data.wind.speed * 3.6).toFixed(1);
              const humidity = data.main.humidity;

              currentWeather.append(`
                  <div class="border rounded-pill my-4" id="weatherIcon">${todayIcon}</div>
                  <h4 class="my-2 mx-2"><i class="me-2 bi bi-thermometer-half" style="color: #A26769;"></i> ${tempCelsius} °C</h4>
                  <h4 class="my-2 mx-2"><i class="me-2 bi bi-wind" style="color: #41576b;"></i> ${wind} km/h</h4>
                  <h4 class="my-2 mb-4 mx-2"><i class="me-2 bi bi-droplet-half" style="color: #99B2DD;"></i>${humidity} %</h4>
              `);
          });
  }

  // Function to add pins to the map
  function addPinToMap(lat, lon, title) {
      var marker = new H.map.Marker({ lat: lat, lng: lon });
      map.addObject(marker);
  }

  // Set up map
  const platform = new H.service.Platform({ apikey: apiKeyGeo });
  const defaultLayers = platform.createDefaultLayers();
  var map = new H.Map(document.getElementById("map"), defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1,
  });

  // Set up the map UI
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Event listeners
  window.addEventListener("resize", () => map.getViewPort().resize());

  document.getElementById("searchButton").addEventListener("click", function () {
      const location = document.getElementById("locationInput").value;
      fetchData(location);
      window.location.href = "#navigationBar";
      $(".customNav").removeClass("d-none");
      $(".weatherContainer").removeClass("d-none");
      $(".activitiesContainer").removeClass("d-none");
  });

  // Check if the modal should be shown
  var shouldShowModal = localStorage.getItem("showModal");
  if (shouldShowModal !== "false") {
      // Show modal
      var welcomeModal = new bootstrap.Modal(document.getElementById("PawsPlannerModal"), { backdrop: "static" });
      welcomeModal.show();
  }

  // Add click event listener to the "Let's get started" button
  document.getElementById("letsGetStartedBtn").addEventListener("click", function () {
      // Set a flag in localStorage to indicate that the modal has been seen
      localStorage.setItem("showModal", "false");

      // Hide modal
      var welcomeModal = bootstrap.Modal.getInstance(document.getElementById("PawsPlannerModal"));
      if (welcomeModal) {
          welcomeModal.hide();
      }
  });
});

$(document).ready(function () {
  var searchButton = $("#searchButton");
  var cityInput = $("#locationInput");

  // Event listener for fetching current weather
  function fetchCurrentWeather(city) {
      var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}`;

      fetch(queryURL)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              const currentWeather = $("#todayWeather");
              currentWeather.empty();

              const weatherTodayIcon = data.weather[0].icon;
              const todayIcon = `<img src="https://openweathermap.org/img/wn/${weatherTodayIcon}@2x.png"/>`;
              const tempCelsius = data.main.temp.toFixed(1);
              const wind = (data.wind.speed * 3.6).toFixed(1);
              const humidity = data.main.humidity;

              currentWeather.append(`
                  <div class="border rounded-pill my-4" id="weatherIcon">${todayIcon}</div>
                  <h4 class="my-2 mx-2"><i class="me-2 bi bi-thermometer-half" style="color: #A26769;"></i> ${tempCelsius} °C</h4>
                  <h4 class="my-2 mx-2"><i class="me-2 bi bi-wind" style="color: #41576b;"></i> ${wind} km/h</h4>
                  <h4 class="my-2 mb-4 mx-2"><i class="me-2 bi bi-droplet-half" style="color: #99B2DD;"></i>${humidity} %</h4>
              `);
          });
  }

  // Event listener for search button
  searchButton.on("click", function () {
      var city = cityInput.val();
      fetchCurrentWeather(city);
  });
});
