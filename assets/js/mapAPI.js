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
        console.log(data);
        const lon = data.items[0].position.lng;
        const lat = data.items[0].position.lat;
        moveMapToLocation(map, lat, lon);
      } else {
        console.error("Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function moveMapToLocation(map, lat, lon) {
    map.setCenter({ lat: lat, lng: lon });
    map.setZoom(16);
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

document.addEventListener('DOMContentLoaded', function () {
  var welcomeModal = new bootstrap.Modal(document.getElementById('PawsPlannerModal'));
  welcomeModal.show();
});