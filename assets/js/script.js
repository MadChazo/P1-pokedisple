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
var noneFoundText = document.getElementById("noneFound");
var spriteEl = document.getElementById("sprite");
var background = document.getElementById("background");
let cardDisplay = document.getElementById('cards')
let favList = []


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
        var foundSprite = document.createElement("img");
        foundSprite.src = spriteURL;
        spriteEl.appendChild(foundSprite);
      }
    });
}

// Adds card to favorite list
function faveHandler(event) {
  console.log(event);
  console.log(this.previousElementSibling.src)
  let targetFavLink = this.previousElementSibling.src;
  favList.push(targetFavLink)
  savedFav = JSON.stringify(favList);
  localStorage.setItem('favorites', savedFav)
}

// Shows favorite button on mouseover of card
function showFave(event) {
  if (event.target.children[1]) {
    event.target.children[1].setAttribute("style", "display: inline");
  } else {
    event.target.parentElement.children[1].setAttribute(
      "style",
      "display: inline"
    );
  }
}

// Hides favorite button on mouseout of card
function hideFave(event) {
  if (event.target.children[1]) {
    event.target.children[1].setAttribute("style", "display: none");
  } else {
    event.target.parentElement.children[1].setAttribute(
      "style",
      "display: none"
    );
  }
}

// Fetches all card images of that pokemon
function searchHandler() {
  noneFoundText.setAttribute("style", "display: none")
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
      if (!pokeList[0]) { // If no cards found
        var missingSprite = document.createElement("img");
        missingSprite.src = "assets/images/MissingNo.png";
        spriteEl.appendChild(missingSprite);
        loadingText.setAttribute("style", "display: none");
        noneFoundText.setAttribute("style", "display: block")
        background.setAttribute("style", "display: block");
        return;
      }
      cardDisplay.classList.remove('custCol') // Removes height limit on card section
      // Creates and displays cards
      for (let i = 0; i < pokeList.length; i++) {
        console.log(pokeList[i].images.large);
        var columnNum = i % 4;
        var newCard = document.createElement("figure");
        newCard.classList.add("image", "is-3by4", "pokeCard");
        newCard.innerHTML =
          '<img src="' +
          pokeList[i].images.large +
          '" /><span class="favoriteBtn">❤</span>';
        columns[columnNum].appendChild(newCard);
      }
      // Adds favorite functionality listeners
      var cardImages = document.getElementsByClassName("pokeCard");
      var faves = document.getElementsByClassName("favoriteBtn");
      for (let i = 0; i < cardImages.length; i++) {
        cardImages[i].addEventListener("mouseover", showFave);
        cardImages[i].addEventListener("mouseout", hideFave);
      }
      for (let i = 0; i < faves.length; i++) {
        faves[i].addEventListener("click", faveHandler);
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
