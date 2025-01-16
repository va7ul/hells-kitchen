import { createCardTemplate } from '../card_template';
import { popUpFunction } from '../modals/recipe';
import { removeFromFavorites } from '../api';
import { checkHeart } from './helpers/check-heart';
import {
  setPagination,
  calculationOfVisibleElements,
  printPagination,
  movePage,
} from './helpers/favorite-pagination';
import Pagination from 'tui-pagination';

const KEY_FAVORITE = 'favorite';

const heroEl = document.querySelector('.hero-section-favorites');
const filtersEl = document.querySelector('.favorite-filter');
const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const paginationEl = document.getElementById('pagination');

const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;

let currentPage = 1;
let itemsPerPage = 0;
let visiblePages = 0;
let paginationMain = null;

const emptyStorageEl = document.querySelector('.empty-storage-wrapper');

const favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];


if (favoritesArray.length !== 0) {
  const paginationSettings = setPagination(
    mainElementWidth,
    paginationEl,
    favoritesArray
  );

  itemsPerPage = paginationSettings.itemsPerPage;
  visiblePages = paginationSettings.visiblePages;

  let partOfArr = calculationOfVisibleElements(
    itemsPerPage,
    currentPage,
    favoritesArray
  );
  createCardTemplate(partOfArr, favoriteRecipesListEl);
  checkHeart();

  paginationMain = new Pagination(
    'pagination',
    printPagination(favoritesArray, itemsPerPage, visiblePages)
  );

  paginationMain.on('afterMove', eventData =>
    movePage(
      eventData,
      favoritesArray,
      itemsPerPage,
      currentPage,
      favoriteRecipesListEl
    )
  );
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

    paginationMain._options.totalItems = favoritesArray.length;
    if (favoritesArray?.length === 0) {
      paginationEl.classList.add('hiddenvisualy');
    }
    evt.target.closest('.card-template').remove();
  }
}

export { KEY_FAVORITE };
