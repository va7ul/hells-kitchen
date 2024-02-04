import { createCardTemplate } from '../card_template';
import { popUpFunction } from '../modals/recipe';
import { removeFromFavorites } from '../api';
import Pagination from 'tui-pagination';

const KEY_FAVORITE = 'favorite';

const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const heroEl = document.querySelector('.hero-section-favorites');
const filtersEl = document.querySelector('.favorite-filter');
const paginationEl = document.getElementById('pagination');

const emptyStorageEl = document.querySelector('.empty-storage-wrapper');

const favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;
console.log('paginationEl', paginationEl);

let currentPage = 1;
let itemsPerPage = 0;
let visiblePages = 0;

if (mainElementWidth < 768) {
  console.log('mainElementWidth', mainElementWidth);
  itemsPerPage = 3;
  visiblePages = 2;
  if (favoritesArray.length <= itemsPerPage) {
    paginationEl.classList.add('hiddenvisualy');
  }
} else if (mainElementWidth >= 768) {
  console.log('mainElementWidth', mainElementWidth);
  itemsPerPage = 6;
  visiblePages = 3;
  if (favoritesArray.length <= itemsPerPage) {
    paginationEl.classList.add('hiddenvisualy');
  }
}

let start = itemsPerPage * currentPage - itemsPerPage;
let end = start + itemsPerPage;
let partOfArr = favoritesArray.slice(start, end);
console.log('all');

if (favoritesArray.length !== 0) {
  createCardTemplate(partOfArr, favoriteRecipesListEl);
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

let pagination = new Pagination('pagination', {
  totalItems: favoritesArray.length,
  itemsPerPage: itemsPerPage,
  visiblePages: visiblePages,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"></a>',
  },
});

pagination.on('afterMove', function (eventData) {
  console.log('eventData', eventData);
  currentPage = eventData.page;
  start = itemsPerPage * currentPage - itemsPerPage;
  end = start + itemsPerPage;
  partOfArr = favoritesArray.slice(start, end);
  createCardTemplate(partOfArr, favoriteRecipesListEl);
  const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
  checkHeartEl.forEach(item => (item.checked = true));
});
export { KEY_FAVORITE };
