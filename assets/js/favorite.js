var columns = document.getElementsByClassName("column");

function displayFav() {
  let favGalleryString = localStorage.getItem("favorites");
  let favGallery = JSON.parse(favGalleryString);
  console.log(favGallery);
  let filteredGallery = favGallery.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  console.log(u); // Output: [1, 2, 3, 4, 5]
  for (let i = 0; i < filteredGallery.length; i++) {
    var columnNum = i % 4;
    var newCard = document.createElement("figure");
    newCard.classList.add("image", "is-3by4", "pokeCard");
        newCard.innerHTML =
          '<img src="' +
          filteredGallery[i] +
          '" /><span class="favoriteBtn">❤</span>';
        columns[columnNum].appendChild(newCard);
  }
}

displayFav();
