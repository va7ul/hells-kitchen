import { createCardTemplate } from "../card_template";
import { popUpFunction } from '../modals/recipe';
import { removeFromFavorites } from "../api";

const KEY_FAVORITE = 'favorite';

const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const heroEl = document.querySelector('.hero-section-favorites');
const filtersEl = document.querySelector('.favorite-filter');
const paginationEl = document.querySelector('.tui-pagination');

const emptyStorageEl = document.querySelector('.empty-storage-wrapper');

const favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];


console.log('dddd')




if (favoritesArray.length !== 0) {
  createCardTemplate(favoritesArray, favoriteRecipesListEl);
  const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
  checkHeartEl.forEach((item) => item.checked = true)
} else {
  heroEl.classList.add("hero-is-hidden");
  filtersEl.classList.add('hiddenvisualy');
  paginationEl.classList.add('hiddenvisualy');
  emptyStorageEl.classList.remove('hiddenvisualy');
}

favoriteRecipesListEl.addEventListener('click', onClick);

function onClick(evt) {
  //відкриття модалки
  if (evt.target.classList.contains('card-template-btn')) {
    const product = findProduct(evt.target);
    popUpFunction(product);
  }
  //видалення з favorites
  if (evt.target.classList.contains('js-add-to-fav')) {
    removeFromFavorites(evt.target, favoritesArray);
    evt.target.closest('.card-template').remove();
  }
}

function findProduct(elem) {
  const productId = elem.closest('.card-template').dataset.id;
  return favoritesArray.find(({ _id }) => _id === productId);
}

// function removeFromFavorites(elem, arr) {
//   console.log(jjj);
//   const productId = elem.closest('.card-template').dataset.id;
//   const removeElemIdx = arr.findIndex(
//     item => item._id === productId
//   );
//   arr.splice(removeElemIdx, 1);
//   localStorage.setItem(KEY_FAVORITE, JSON.stringify(arr));
// }

export {KEY_FAVORITE};