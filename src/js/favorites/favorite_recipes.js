import { createCardTemplate } from '../card_template';
import { popUpFunction } from '../modals/recipe';
import { removeFromFavorites } from '../api';
import { checkHeart } from './helpers/check-heart';
import {
  paginationEl,
  mainElement,
  mainElementWidth,
  currentPage,
  itemsPerPage,
  visiblePages,
  setPagination,
  start,
  end,
  partOfArr,
} from './helpers/favorite-pagination';
import Pagination from 'tui-pagination';

const KEY_FAVORITE = 'favorite';

const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const heroEl = document.querySelector('.hero-section-favorites');
const filtersEl = document.querySelector('.favorite-filter');


const emptyStorageEl = document.querySelector('.empty-storage-wrapper');

const favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];





if (favoritesArray.length !== 0) {
  createCardTemplate(partOfArr, favoriteRecipesListEl);
  checkHeart();
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
