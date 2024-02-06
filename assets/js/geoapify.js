
function getPlaces(){
      var categories = "catering" // an array? of categories user wants to search for as per: https://apidocs.geoapify.com/docs/places/#categories
      var conditions = "dogs" // an array? of additional conditions user wants to search for as per: https://apidocs.geoapify.com/docs/places/#conditions
      var lon = "-0.1252584240406704" //longitude
      var lat = "51.510634994721855" //latitude
      var radius = "10000" //search radius in metres, e.g. 5000

      fetch(`https://api.geoapify.com/v2/places?categories=${categories}&conditions=${conditions}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&lang=en&limit=20&apiKey=fe9a326d269345a4b9e1136bfdae6a47`)
        .then(response => response.json())
        .then(function loadCards(result){
            console.log(result)
        })
        .catch(error => console.log('error', error));
}
