// Searching General information
fetch("https://pokeapi.co/api/v2/pokemon-species/tyranitar/").then(function (
  response
) {
  console.log(response.json());
});

fetch("https://pokeapi.co/api/v2/pokemon/tyranitar/").then(function (response) {
  return response.json();
}).then (function(data) {
    pokedata = data
    console.log(data)
    sprite = data.sprites.front_default
    console.log(sprite)
});