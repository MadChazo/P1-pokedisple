// Test call to API  - leaving this here for reference to make sure the API calls are working
var requestURL = "https://api.pokemontcg.io/v2/cards/xy1-91";
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
var loadingText = document.getElementById("loading");
var spriteEl = document.getElementById("sprite");

// Fetches sprite of searched pokemon and displays on page
function findSprite(name) {
  var requestURL = "https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase();
  fetch(requestURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return response.ok;
      }
    })
    .then(function (data) {
      if (data) {
        var spriteURL = data.sprites.front_default;
        var spriteName = data.name;
        var foundSprite = document.createElement("img");
        foundSprite.src = spriteURL;
        var foundName = document.createElement("figcaption");
        foundName.textContent = spriteName;
        spriteEl.appendChild(foundSprite);
        spriteEl.appendChild(foundName);
      }
    });
}

// Fetches all card images of that pokemon
function searchHandler() {
  var pokeName = searchInput.value;
  if (pokeName == "") {
    return;
  }
  var requestURL = "https://api.pokemontcg.io/v2/cards?q=name:" + pokeName;
  // Clears out previous search results
  for (let i = 0; i < columns.length; i++) {
    columns[i].innerHTML = "";
  }
  spriteEl.innerHTML = "";
  loadingText.setAttribute("style", "display: block");
  fetch(requestURL, {
    headers: { "X-Api-Key": "bd0f5cb7-f4ed-4cff-bbc7-aca1d15ed3c7" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var pokeList = data.data;
      console.log(pokeList);
      if (!pokeList[0]) {
        var missingSprite = document.createElement("img");
        missingSprite.src = "assets/images/MissingNo.png";
        var noneFound = document.createElement("figcaption");
        noneFound.textContent = "No cards found";
        spriteEl.appendChild(missingSprite);
        spriteEl.appendChild(noneFound);
        loadingText.setAttribute("style", "display: none");
        return;
      }
      for (let i = 0; i < pokeList.length; i++) {
        console.log(pokeList[i].images.large)
        var columnNum = i % 4;
        var newCard = document.createElement("figure");
        newCard.classList.add("image", "is-3by4", "pokeCard");
        newCard.innerHTML = '<img src="' + pokeList[i].images.large + '" />';
        columns[columnNum].appendChild(newCard);
      }
      loadingText.setAttribute("style", "display: none");
    })
    .then(findSprite(pokeName));
}

// Event listeners
searchBtn.addEventListener("click", searchHandler);
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchHandler();
});
