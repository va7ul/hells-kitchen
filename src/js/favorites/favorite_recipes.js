import { createCardTemplate } from '../card_template';
import { popUpFunction } from '../modals/recipe';
import { removeFromFavorites } from '../api';


const KEY_FAVORITE = 'favorite';


const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const heroEl = document.querySelector('.hero-section-favorites');
const filtersEl = document.querySelector('.favorite-filter');


const emptyStorageEl = document.querySelector('.empty-storage-wrapper');

const favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];


if (favoritesArray.length !== 0) {
  createCardTemplate(favoritesArray, favoriteRecipesListEl);
  const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
  checkHeartEl.forEach(item => (item.checked = true));
} else {
  heroEl.classList.add('hero-is-hidden');
  filtersEl.classList.add('hiddenvisualy');
  paginationEl.classList.add('hiddenvisualy');
  emptyStorageEl.classList.remove('hiddenvisualy');
}

favoriteRecipesListEl.addEventListener('click', onClick);

function onClick(evt) {
  //відкриття модалки
  if (evt.target.classList.contains('card-template-btn')) {
    const productId = evt.target.closest('.card-template').dataset.id;
    popUpFunction(productId);
  }
  //видалення з favorites
  if (evt.target.classList.contains('js-add-to-fav')) {
    removeFromFavorites(KEY_FAVORITE, evt.target, favoritesArray);
    evt.target.closest('.card-template').remove();
  }
}



export { KEY_FAVORITE };
