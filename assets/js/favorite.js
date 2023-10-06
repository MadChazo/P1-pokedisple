var columns = document.getElementsByClassName("column");
let favGalleryString = localStorage.getItem("favorites");
let cardDisplay = document.getElementById("cards");
let favGallery = JSON.parse(favGalleryString);
let filteredGallery = favGallery.filter((value, index, self) => {
  return self.indexOf(value) === index;
});
filteredGalleryString = JSON.stringify(filteredGallery);
localStorage.setItem("favorites", filteredGalleryString);
if (filteredGallery.length > 0) {
  cardDisplay.classList.remove("custCol");
}

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

function removeFave() {
  let targetFavLink = this.previousElementSibling.src;
  newFilteredGallery = filteredGallery.filter((item) => item !== targetFavLink);
  newFilteredGalleryString = JSON.stringify(newFilteredGallery);
  localStorage.setItem("favorites", newFilteredGalleryString);
  unFavCard = this.parentNode;
  unFavCard.remove();
  location.reload();
}

function displayFav() {

  for (let i = 0; i < filteredGallery.length; i++) {
    var columnNum = i % 4;
    var newCard = document.createElement("figure");
    newCard.classList.add("image", "is-3by4", "pokeCard");
    newCard.innerHTML =
      '<img src="' +
      filteredGallery[i] +
      '" /><span class="favoriteBtn">❌</span>';
    columns[columnNum].appendChild(newCard);
    var cardImages = document.getElementsByClassName("pokeCard");
    var faves = document.getElementsByClassName("favoriteBtn");
    for (let i = 0; i < cardImages.length; i++) {
      cardImages[i].addEventListener("mouseover", showFave);
      cardImages[i].addEventListener("mouseout", hideFave);
    }
    for (let i = 0; i < faves.length; i++) {
      faves[i].addEventListener("click", removeFave);
    }
  }
}

displayFav();
