// Test call to API  - leaving this here for reference to make sure the API calls are working
var requestURL = "https://api.pokemontcg.io/v2/cards/xy1-1";
fetch(requestURL, {
  headers: { "X-Api-Key": "bd0f5cb7-f4ed-4cff-bbc7-aca1d15ed3c7" },
}).then(function (response) {
  console.log(response.json());
});

// This will be replaced with a value pulled from the input
var pokeName = "pikachu";

// Fetches all card images of that pokemon
var requestURL = "https://api.pokemontcg.io/v2/cards?q=name:" + pokeName;
fetch(requestURL, {
  headers: { "X-Api-Key": "bd0f5cb7-f4ed-4cff-bbc7-aca1d15ed3c7" },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    pokeList = data.data;
    console.log(pokeList);
    for (let i = 0; i < pokeList.length; i++) {
      console.log(pokeList[i].images.small);
    }
  });
