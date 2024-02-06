function getPlaces(){
  $("#loadingStatus").removeClass("d-none")
  var categories = ["catering"] // an array? of categories user wants to search for as per: https://apidocs.geoapify.com/docs/places/#categories
  var conditions = ["dogs", "wheelchair"] // an array? of additional conditions user wants to search for as per: https://apidocs.geoapify.com/docs/places/#conditions
  var lon = "-0.1252584240406704" //longitude
  var lat = "51.510634994721855" //latitude
  var radius = "10000" //search radius in metres, e.g. 5000

  categories.forEach(element => {
    $("#activeCategories").append(`<h6 class="d-inline me-2"><span class="badge bg-secondary">${element}</span></h6>`)
  });
  conditions.forEach(element => {
    $("#activeCategories").append(`<h6 class="d-inline me-2"><span class="badge bg-secondary">${element}</span></h6>`)
  })

  fetch(`https://api.geoapify.com/v2/places?categories=${categories.join(',')}&conditions=${conditions.join(',')}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&lang=en&limit=20&apiKey=fe9a326d269345a4b9e1136bfdae6a47`)
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


//jQuery UI autocomplete function

$( function() {
  $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });
  var data = [
    { label: "restaurants", category: "Restaurant" },
    { label: "pizza", category: "Restaurant" },
    { label: "burger", category: "Restaurant" },
    { label: "regional", category: "Restaurant" },
    { label: "italian", category: "Restaurant" },
    { label: "chinese", category: "Restaurant" },
    { label: "sandwich", category: "Restaurant" },
    { label: "chicken", category: "Restaurant" },
    { label: "mexican", category: "Restaurant" },
    { label: "japanese", category: "Restaurant" },
    { label: "american", category: "Restaurant" },
    { label: "kebab", category: "Restaurant" },
    { label: "indian", category: "Restaurant" },
    { label: "sushi", category: "Restaurant" },
    { label: "french", category: "Restaurant" },
    { label: "german", category: "Restaurant" },
    { label: "thai", category: "Restaurant" },
    { label: "greek", category: "Restaurant" },
    { label: "seafood", category: "Restaurant" },
    { label: "fish and chips", category: "Restaurant" },
    { label: "steak house", category: "Restaurant" },
    { label: "international", category: "Restaurant" },
    { label: "tex-mex", category: "Restaurant" },
    { label: "vietnamese", category: "Restaurant" },
    { label: "turkish", category: "Restaurant" },
    { label: "german", category: "Restaurant" },
    { label: "korean", category: "Restaurant" },
    { label: "noodles", category: "Restaurant" },
    { label: "barbecue", category: "Restaurant" },
    { label: "spanish", category: "Restaurant" },
    { label: "fish", category: "Restaurant" },
    { label: "ramen", category: "Restaurant" },
    { label: "mediterranean", category: "Restaurant" },
    { label: "friture", category: "Restaurant" },
    { label: "beef bowl", category: "Restaurant" },
    { label: "lebanese", category: "Restaurant" },
    { label: "wings", category: "Restaurant" },
    { label: "georgian", category: "Restaurant" },
    { label: "tapas", category: "Restaurant" },
    { label: "indonesian", category: "Restaurant" },
    { label: "arab", category: "Restaurant" },
    { label: "portuguese", category: "Restaurant" },
    { label: "russian", category: "Restaurant" },
    { label: "filipino", category: "Restaurant" },
    { label: "african", category: "Restaurant" },
    { label: "malaysian", category: "Restaurant" },
    { label: "caribbean", category: "Restaurant" },
    { label: "peruvian", category: "Restaurant" },
    { label: "bavarian", category: "Restaurant" },
    { label: "brazilian", category: "Restaurant" },
    { label: "curry", category: "Restaurant" },
    { label: "dumpling", category: "Restaurant" },
    { label: "persian", category: "Restaurant" },
    { label: "argentinian", category: "Restaurant" },
    { label: "oriental", category: "Restaurant" },
    { label: "balkan", category: "Restaurant" },
    { label: "moroccan", category: "Restaurant" },
    { label: "pita", category: "Restaurant" },
    { label: "ethiopian", category: "Restaurant" },
    { label: "taiwanese", category: "Restaurant" },
    { label: "latin american", category: "Restaurant" },
    { label: "hawaiian", category: "Restaurant" },
    { label: "latin", category: "Restaurant" },
    { label: "irish", category: "Restaurant" },
    { label: "austrian", category: "Restaurant" },
    { label: "croatian", category: "Restaurant" },
    { label: "danish", category: "Restaurant" },
    { label: "tacos", category: "Restaurant" },
    { label: "bolivian", category: "Restaurant" },
    { label: "hungarian", category: "Restaurant" },
    { label: "western", category: "Restaurant" },
    { label: "european", category: "Restaurant" },
    { label: "jamaican", category: "Restaurant" },
    { label: "cuban", category: "Restaurant" },
    { label: "soup", category: "Restaurant" },
    { label: "uzbek", category: "Restaurant" },
    { label: "nepalese", category: "Restaurant" },
    { label: "czech", category: "Restaurant" },
    { label: "syrian", category: "Restaurant" },
    { label: "afghan", category: "Restaurant" },
    { label: "malay", category: "Restaurant" },
    { label: "chili", category: "Restaurant" },
    { label: "belgian", category: "Restaurant" },
    { label: "ukrainian", category: "Restaurant" },
    { label: "swedish", category: "Restaurant" },
    { label: "pakistani", category: "Restaurant" },
    { label: "all fast food places", category: "Fast Food" },
    { label: "pizza", category: "Fast Food" },
    { label: "burger", category: "Fast Food" },
    { label: "sandwich", category: "Fast Food" },
    { label: "kebab", category: "Fast Food" },
    { label: "fish and chips", category: "Fast Food" },
    { label: "noodles", category: "Fast Food" },
    { label: "ramen", category: "Fast Food" },
    { label: "wings", category: "Fast Food" },
    { label: "tapas", category: "Fast Food" },
    { label: "pita", category: "Fast Food" },
    { label: "tacos", category: "Fast Food" },
    { label: "soup", category: "Fast Food" },
    { label: "salad", category: "Fast Food" },
    { label: "hot dog", category: "Fast Food" },
    { label: "all cafés", category: "Café" },
    { label: "waffle", category: "Café" },
    { label: "ice cream", category: "Café" },
    { label: "coffee shop", category: "Café" },
    { label: "donut", category: "Café" },
    { label: "cake", category: "Café" },
    { label: "frozen yoghurt", category: "Café" },
    { label: "dessert", category: "Café" },
    { label: "coffee", category: "Café" },
    { label: "tea", category: "Café" },
    { label: "food court", category: "" },
    { label: "bar", category: "" },
    { label: "pub", category: "" },
    { label: "ice cream", category: "" },
    { label: "biergarten", category: "" },
    { label: "taproom", category: "" },
  ];
  
  $( "#searcharea2" ).catcomplete({
    delay: 0,
    source: data
  });
} );