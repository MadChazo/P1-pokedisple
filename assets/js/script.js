// Test call to API  - leaving this here for reference to make sure the API calls are working
var requestURL = "https://api.pokemontcg.io/v2/cards/xy1-1";
fetch(requestURL, {
  headers: { "X-Api-Key": "bd0f5cb7-f4ed-4cff-bbc7-aca1d15ed3c7" },
}).then(function (response) {
  console.log(response.json());
});
// ------------ Actual code below ------------
// Document element variables
var columns = document.getElementsByClassName("column");
var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementById("searchInput");
var searchForm = document.getElementById("searchForm");

// Fetches all card images of that pokemon
function searchHandler() {
  var pokeName = searchInput.value;
  var requestURL = "https://api.pokemontcg.io/v2/cards?q=name:" + pokeName;
  // Clears out previous search results
  for (let i = 0; i < columns.length; i++) {
    columns[i].innerHTML = "";
  }
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
        console.log(pokeList[i].images.large);
        var columnNum = i % 4;
        var newCard = document.createElement("figure");
        newCard.classList.add("image", "is-3by4", "pokeCard");
        newCard.innerHTML = '<img src="' + pokeList[i].images.large + '" />';
        columns[columnNum].appendChild(newCard);
      }
    });
}

// Event listeners
searchBtn.addEventListener("click", searchHandler);
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchHandler();
});
