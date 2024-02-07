// Added basic fetch for data from Mapping API
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://geocode.search.hereapi.com/v1/geocode";
  const apiKey = "RQsjWkadZwLvAyUu3XQzmATwlTXAmVQFvpHX1xAHFXU";

  async function fetchData(location) {
    try {
      const response = await fetch(
        `${apiUrl}?q=${location}&limit=4&apiKey=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        const lon = data.items[0].position.lng;
        const lat = data.items[0].position.lat;

        moveMapToLocation(map, lat, lon);

        fetchPlaces(lon, lat);
      } else {
        console.error("Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Display location of searched city on the map
  function moveMapToLocation(map, lat, lon) {
    map.setCenter({ lat: lat, lng: lon });
    map.setZoom(16);
  }

  // Fetch places using lat and lon from previous API
  function fetchPlaces(lon, lat) {
    $("#loadingStatus").removeClass("d-none");
    var categories = ["catering"]; // an array of categories user wants to search for as per: https://apidocs.geoapify.com/docs/places/#categories
    var conditions = ["dogs", "wheelchair"]; // an array of additional conditions user wants to search for as per: https://apidocs.geoapify.com/docs/places/#conditions
    var radius = "10000";
    var stringLat = JSON.stringify(lat);
    var stringLon = JSON.stringify(lon);

    categories.forEach((element) => {
      $("#activeCategories").append(
        `<h6 class="d-inline me-2"><span class="badge bg-secondary">${element}</span></h6>`
      );
    });
    conditions.forEach((element) => {
      $("#activeCategories").append(
        `<h6 class="d-inline me-2"><span class="badge bg-secondary">${element}</span></h6>`
      );
    });

    var queryURLPlaces =
      "https://api.geoapify.com/v2/places?categories=pet&filter=circle:" +
      lon +
      "," +
      lat +
      ",10000&bias=proximity:" +
      lon +
      "," +
      lat +
      "&lang=en&limit=20&apiKey=fe9a326d269345a4b9e1136bfdae6a47";

    fetch(queryURLPlaces)
      .then(function (response) {
        return response.json();
      })
      .then(function loadCards(result) {
        result.features.forEach((searchResult) => {
          console.log("Adding result to page...");
          const eatName = searchResult.properties.name;
          const eatLocation = searchResult.properties.address_line2;
          const isEatLink = "Visit Site";
          const eatWebsiteLink = searchResult.properties.datasource.raw.website;
          const eatOpeningHrs =
            searchResult.properties.datasource.raw.opening_hours;
          const eatWheelchair =
            searchResult.properties.datasource.raw.wheelchair;
          const eatDistance = searchResult.properties.distance;

          // need to add if logic to change variables based on data received. e.g. if no website link remove that button or smth

          $("#eatCardContainer").append(`
          <div class="card rounded-0 border-start-0 col-5 col-lg-4" id="eatCard1">
            <img src="./assets/images/PLACEHOLDER restaurant1Image.png" class="card-img-top img-fluid rounded-0 border-bottom" alt="${eatName}"/>
            <div class="card-body">
              <h5 class="card-title mb-4">${eatName}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary"><i class="bi bi-geo-alt-fill me-2"></i>${eatLocation}</h6>
              <p class="monoText"><i class="bi bi-person-walking me-2"></i>${eatDistance}m</p>
              <p class="my-0 monoText"><i class="bi bi-clock me-2"></i>${eatOpeningHrs}</p>
              <p class="my-0 monoText"><i class="bi bi-person-wheelchair me-2"></i>${eatWheelchair}</p>
              <a target="_blank" href="${eatWebsiteLink}" class="btn btn-sm btn-primary mt-2 py-1">${isEatLink}</a>
            </div>
          </div>
          `);
        });
        $("#loadingStatus").addClass("d-none");
      })
      .catch((error) => console.log("error", error));
  }

  const platform = new H.service.Platform({
    apikey: `${apiKey}`,
  });

  const defaultLayers = platform.createDefaultLayers();

  var map = new H.Map(
    document.getElementById("map"),
    defaultLayers.vector.normal.map,
    {
      center: { lat: 50, lng: 5 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1,
    }
  );

  // Event listeners
  window.addEventListener("resize", () => map.getViewPort().resize());

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      const location = document.getElementById("locationInput").value;
      fetchData(location);
      window.location.href = "#navigationBar";
      $(".customNav").removeClass("d-none");
      $(".weatherContainer").removeClass("d-none");
      $(".activitiesContainer").removeClass("d-none");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Check if the modal should be shown
  var shouldShowModal = localStorage.getItem("showModal");
  if (shouldShowModal !== "false") {
    // Show modal
    var welcomeModal = new bootstrap.Modal(
      document.getElementById("PawsPlannerModal"),
      { backdrop: "static" }
    );
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
