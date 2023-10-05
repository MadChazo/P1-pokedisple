var columns = document.getElementsByClassName("column");

function displayFav() {
  let favGalleryString = localStorage.getItem("favorites");
  let favGallery = JSON.parse(favGalleryString);
  console.log(favGallery);
  for (let i = 0; i < favGallery.length; i++) {
    var columnNum = i % 4;
    var newCard = document.createElement("figure");
    newCard.classList.add("image", "is-3by4", "pokeCard");
        newCard.innerHTML =
          '<img src="' +
          favGallery[i] +
          '" /><span class="favoriteBtn">❤</span>';
        columns[columnNum].appendChild(newCard);
  }
}

displayFav();
