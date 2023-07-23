//import
const favoriteArr = [];
const KEY_FAVORITE = 'favotire';
function createMarkup(arr,list) {
  return arr.map(({ id, name }) => {
    return { text: `${name}`, value: `${id}` };
  });
}
function createModal(product) {
    console.log('a');
}
//import

//export

//removeFromFavorite;

//favoriteRecipesListEl;

//export

const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');

favoriteRecipesListEl.addEventListener("click", onClick)


const favorite = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];
createMarkup(favorite, favoriteRecipesListEl);


function onClick(evt) {
    //відкриття модалки
    if (evt.target.classList.contains(".info")) {
        const product = findProduct(evt.target);
        createModal(product);
    }
    //видалення з favorites
  if (evt.target.classList.contains('favorite')) {
      removeFromFavorite(evt.target);
}  
}

function findProduct(elem) {
    const productId = Number(elem.closest('.card').dataset.id);
    return favoriteArr.find(({id}) => id === productId)
}

function removeFromFavorite(elem) {
      const productId = Number(elem.closest('.card').dataset.id);
      const removeElemIdx = favoriteArr.findIndex(
        item => item.id === productId
      );
      favoriteArr.splice(removeElemIdx, 1);
      localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));
}

export { favoriteRecipesListEl, removeFromFavorite };


// function findProductbyFilter(elem) {
//   const productId = Number(elem.closest('.card').dataset.id);
//   return favoriteArr.find(({ id }) => id === productId);
// }
