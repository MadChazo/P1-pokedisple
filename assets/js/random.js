// Document element variables
var homeBtn = document.getElementById("homeBtn");
var randBtn = document.getElementById("randBtn");
var randName = document.getElementById("randName");
var randImg = document.getElementById("randImg");
var randData = document.getElementById("randData");
var loadText = document.getElementById("loading")

function sendHome() {
  window.location = "index.html";
}

function sendRandom() {
  window.location = "random.html";
}

function printRandCard(card) {
  loadText.setAttribute("style", "display:none")
  randName.textContent = card.name;
  randImg.innerHTML = "<img src='" + card.images.large + "' />";
  var dataArtist = document.createElement("li");
  dataArtist.textContent = "Artist: " + card.artist;
  var dataSet = document.createElement("li");
  dataSet.textContent = "Set: " + card.set.name;
  var dataCMPrice = document.createElement("li");
  dataCMPrice.innerHTML =
    "Cardmarket Average Sell Price: &euro;" + card.cardmarket.prices.averageSellPrice;
  randData.appendChild(dataArtist);
  randData.appendChild(dataSet);
  randData.appendChild(dataCMPrice);
}

function getRandCard() {
  var maxPokeNum = 1017; // as of 10-02-2023
  var requestURL =
    "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:" +
    Math.floor(Math.random() * maxPokeNum);
  fetch(requestURL, {
    headers: { "X-Api-Key": "bd0f5cb7-f4ed-4cff-bbc7-aca1d15ed3c7" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var pokeList = data.data;
      if (!pokeList[0]) {
        getRandCard();
      }
      console.log(pokeList);
      var randCard = pokeList[Math.floor(Math.random() * pokeList.length)];
      console.log(randCard);
      return randCard;
    })
    .then(function (randCard) {
      printRandCard(randCard);
    });
}
getRandCard();

// Event listeners
homeBtn.addEventListener("click", sendHome);
randBtn.addEventListener("click", sendRandom);
