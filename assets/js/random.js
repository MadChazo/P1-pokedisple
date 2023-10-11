// Document element variables
var homeBtn = document.getElementById("homeBtn");
var randBtn = document.getElementById("randBtn");
var randName = document.getElementById("randName");
var randImg = document.getElementById("randImg");
var randData = document.getElementById("randData");
var loadText = document.getElementById("loading-random");

// Displays random card with name and information about it
function printRandCard(card) {
  loadText.setAttribute("style", "display:none");
  randName.textContent = card.name;
  randImg.innerHTML =
    "<img src='" + card.images.large + "' alt='random Pokémon card' />";
  var dataArtist = document.createElement("li");
  dataArtist.textContent = "Artist: " + card.artist;
  var dataSet = document.createElement("li");
  dataSet.textContent = "Set: " + card.set.name;
  var dataCMPrice = document.createElement("li");
  dataCMPrice.innerHTML =
    "Cardmarket Average Sell Price: &euro;" +
    card.cardmarket.prices.averageSellPrice;
  randData.appendChild(dataArtist);
  randData.appendChild(dataSet);
  randData.appendChild(dataCMPrice);
}

function jSecret() {
  loadText.setAttribute("style", "display:none");
  randName.textContent = "J Cabaluna";
  randImg.innerHTML =
    "<img src='./assets/images/jCard.png' alt='Gatsbeau Pokémon card' />";
  var dataGitHub = document.createElement("li");
  dataGitHub.innerHTML = "<a href='https://github.com/ChasingGatsby'>J on GitHub</a>";
  randData.appendChild(dataGitHub);
}

function mSecret() {
  loadText.setAttribute("style", "display:none");
  randName.textContent = "Madison Chazo";
  randImg.innerHTML =
    "<img src='./assets/images/mCard.png' alt='MadChazo Pokémon card' />";
  var dataGitHub = document.createElement("li");
  dataGitHub.innerHTML = "<a href='https://github.com/MadChazo'>Madison on GitHub</a>";
  randData.appendChild(dataGitHub);
}
function aSecret() {
  loadText.setAttribute("style", "display:none");
  randName.textContent = "Ava Jamora";
  randImg.innerHTML =
    "<img src='./assets/images/aCard.jpg' alt='Butts Station Pokémon card' />";
  var dataGitHub = document.createElement("li");
  dataGitHub.innerHTML = "<a href='https://github.com/afj511'>Ava on GitHub</a>";
  randData.appendChild(dataGitHub);
}

// Gets a "random" Pokemon card
// Note: Randomness is based on Pokedex number, so not every card has an equal chance of being chosen, but each Pokemon has a theoretically equally likely chance of having one of their cards chosen
function getRandCard() {
  var maxPokeNum = 1017; // Highest national dex number as of 10-08-2023
  maxPokeNum += 1; // makes it possible for random to roll the max number
  maxPokeNum += 3; // for Easter eggs
  var randomNumber = Math.floor(Math.random() * maxPokeNum);
  if (randomNumber === maxPokeNum - 3) {
    jSecret();
  } else if (randomNumber === maxPokeNum - 2) {
    mSecret();
  } else if (randomNumber === maxPokeNum - 1) {
    aSecret();
  } else {
    var requestURL =
      "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:" +
      randomNumber;

    fetch(requestURL, {
      headers: { "X-Api-Key": "bd0f5cb7-f4ed-4cff-bbc7-aca1d15ed3c7" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var pokeList = data.data;
        if (!pokeList[0]) {
          // If that number yields no cards, try again
          getRandCard();
        }
        var randCard = pokeList[Math.floor(Math.random() * pokeList.length)];
        return randCard;
      })
      .then(function (randCard) {
        printRandCard(randCard);
      });
  }
}

// Calls function each time page loads
getRandCard();
