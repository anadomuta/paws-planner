function getPlaces(){
  $("#loadingStatus").removeClass("d-none")
  var categories = "catering" // an array? of categories user wants to search for as per: https://apidocs.geoapify.com/docs/places/#categories
  var conditions = "dogs" // an array? of additional conditions user wants to search for as per: https://apidocs.geoapify.com/docs/places/#conditions
  var lon = "-0.1252584240406704" //longitude
  var lat = "51.510634994721855" //latitude
  var radius = "10000" //search radius in metres, e.g. 5000

  fetch(`https://api.geoapify.com/v2/places?categories=${categories}&conditions=${conditions}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&lang=en&limit=20&apiKey=fe9a326d269345a4b9e1136bfdae6a47`)
    .then(response => response.json())
    .then(function loadCards(result){
      console.log(`https://api.geoapify.com/v2/places?categories=${categories}&conditions=${conditions}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&lang=en&limit=20&apiKey=fe9a326d269345a4b9e1136bfdae6a47`)
      console.log(result)
      result.features.forEach(searchResult => {
        console.log("Adding result to page...")
        const eatName = searchResult.properties.name
        const eatLocation = searchResult.properties.address_line2
        const isEatLink = "Visit Site"
        const eatWebsiteLink = searchResult.properties.datasource.raw.website
        const eatOpeningHrs = searchResult.properties.datasource.raw.opening_hours
        const eatWheelchair = searchResult.properties.datasource.raw.wheelchair
        const eatDistance = searchResult.properties.distance
      
        // if (!eatWebsiteLink){isEatLink = "No Website"}

        // need to add if logic to change variables based on data received. e.g. if no website link remove that button or smth

        $('#eatCardContainer').append(`
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
        `)

      });
    $("#loadingStatus").addClass("d-none")
    })
    .catch(error => console.log('error', error));
}





// var additionalOptions = ["pizza", "burger", "regional", "italian", "chinese", "sandwich", "chicken", "mexican", "japanese", "american", "kebab", "indian", "asian", "sushi", "french", "german", "thai", "greek", "seafood", "fish_and_chips", "steak_house", "international", "tex-mex", "vietnamese", "turkish", "korean", "noodle", "barbecue", "spanish", "fish", "ramen", "mediterranean", "friture", "beef_bowl", "lebanese", "wings", "georgian", "tapas", "indonesian", "arab", "portuguese", "russian", "filipino", "african", "malaysian", "caribbean", "peruvian", "bavarian", "brazilian", "curry", "dumpling", "persian", "argentinian", "oriental", "balkan", "moroccan", "pita", "ethiopian", "taiwanese", "latin_american", "hawaiian", "irish", "austrian", "croatian", "danish", "tacos", "bolivian", "hungarian", "western", "european", "jamaican", "cuban", "soup", "uzbek", "nepalese", "czech", "syrian", "afghan", "malay", "chili", "belgian", "ukrainian", "swedish", "pakistani", "fast_food", "pizza", "burger", "sandwich", "kebab", "fish_and_chips", "noodle", "ramen", "wings", "tapas", "pita", "tacos", "soup", "salad", "hot_dog", "cafe", "waffle", "ice_cream", "coffee_shop", "donut", "crepe", "bubble_tea", "cake", "frozen_yogurt", "dessert", "coffee", "tea", "food_court", "bar", "pub", "ice_cream", "biergarten", "taproom"]