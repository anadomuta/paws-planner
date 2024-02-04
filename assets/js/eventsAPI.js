$(document).ready(function () {
  var express = require("express");
  var cors = require("cors");
  var app = express();

  app.use(cors({ origin: true, credentials: true }));

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer VKI32-j-fVtqTLLlmYXXncLPj3bbmStIo_tMZIj0PiYtsA5MD8vGH9UgSWFp6V2_8Xdb-4LMiNZABCgvzP9gP2Zy3ZilRRiV-kwCB98LGJap1DcTHDqLM6pOcKy_ZXYx",
    },
  };

  fetch(
    "https://api.yelp.com/v3/businesses/search?location=London&term=dog-friendly&categories=restaurants&categories=bars&open_now=true&sort_by=distance&limit=20",
    options,
    { mode: "no-cors" }
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
});
