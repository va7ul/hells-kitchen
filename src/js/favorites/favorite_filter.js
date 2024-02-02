import { createCardTemplate } from '../card_template';
import { KEY_FAVORITE } from './favorite_recipes';
import Pagination from 'tui-pagination';

const favoriteFilterSectionEl = document.querySelector('.favorite-filter');
const favoriteFilterEl = document.querySelector('.favorite-filter-list');
const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const emptyStorageEl = document.querySelector('.empty-storage-wrapper');
const paginationEl = document.querySelector('.tui-pagination');

const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;


let favoriteArrFromLocalStorage =
  JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];
let focusOnBtn = 0;
let focusOnAllCategoryBtn = 0;

const allCategories = favoriteArrFromLocalStorage.flatMap(
  product => product.category
);

const uniqueCategories = allCategories.filter(
  (category, index, array) => array.indexOf(category) === index
);

uniqueCategories.sort((a, b) => a.localeCompare(b));

createFilterMarkup(uniqueCategories);
const btnAllCategory = document.querySelector('.all-category');

favoriteFilterEl.addEventListener('click', onClick);
favoriteRecipesListEl.addEventListener('click', removeHandler);

let currentPage = 1;
let itemsPerPage = 0;
let visiblePages = 0;
console.log('mainElementWidth', mainElementWidth);

if (mainElementWidth < 768) {
  itemsPerPage = 3;
  visiblePages = 2;
  if (favoriteArrFromLocalStorage.length <= itemsPerPage) {
    paginationEl.classList.add('hiddenvisualy');
  }
} else if (mainElementWidth >= 768) {
  itemsPerPage = 12;
  visiblePages = 3;
  if (favoriteArrFromLocalStorage.length <= itemsPerPage) {
    paginationEl.classList.add('hiddenvisualy');
  }
}

let start = itemsPerPage * currentPage - itemsPerPage;
let end = start + itemsPerPage;
let partOfArr = favoriteArrFromLocalStorage.slice(start, end);

function onClick(evt) {
  if (evt.target.classList.contains('favorite-filter-btn')) {
    btnAllCategory.classList.remove('favorite-active-btn');
    if (focusOnAllCategoryBtn != 0) {
      btnAllCategory.classList.remove('in-focus');
      focusOnAllCategoryBtn = 0;
    }
    if (focusOnBtn != 0) {
      const btnInFocus = document.querySelector('.in-focus');
      btnInFocus.classList.remove('in-focus');
      focusOnBtn = 0;
    }
    const findProduct = findProductByFilter(evt.target);
    createCardTemplate(findProduct, favoriteRecipesListEl);
    const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
    checkHeartEl.forEach(item => (item.checked = true));
  }
}

function removeHandler(evt) {
  if (evt.target.classList.contains('js-add-to-fav')) {
    const productId = evt.target.closest('.card-template').dataset.id;
    const product = favoriteArrFromLocalStorage.find(
      ({ _id }) => _id === productId
    );
    favoriteArrFromLocalStorage = JSON.parse(
      localStorage.getItem(KEY_FAVORITE)
    );
    if (
      favoriteArrFromLocalStorage.some(
        item => item.category === product.category
      )
    ) {
      const btn = document.querySelector(
        `li[data-category="${product.category}"]`
      );
      if (
        !btnAllCategory.classList.contains('in-focus') &&
        !btnAllCategory.classList.contains('favorite-active-btn')
      ) {
        btn.firstElementChild.classList.add('in-focus');
        focusOnBtn += 1;
      }
      return;
    } else {
      const btn = document.querySelector(
        `li[data-category="${product.category}"]`
      );
      btn.remove();
      focusOnBtn = 0;
      if (!btnAllCategory.classList.contains('favorite-active-btn')) {
        btnAllCategory.classList.add('in-focus');
        createCardTemplate(favoriteArrFromLocalStorage, favoriteRecipesListEl);
         const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
         checkHeartEl.forEach(item => (item.checked = true));
        focusOnAllCategoryBtn += 1;
      }
      if (favoriteArrFromLocalStorage.length === 0) {
        btnAllCategory.remove();
        favoriteFilterSectionEl.classList.add('hiddenvisualy');
        emptyStorageEl.classList.remove('hiddenvisualy');
      }
    }
  }
}

function createFilterMarkup(arr) {
  const markup = arr
    .map(
      category =>
        `<li class="favorite-filter-item" data-category="${category}">
             <button type="button" class="favorite-filter-btn">
            ${category}
             </button>
          </li>`
    )
    .join('');

  const allCategoryBtn = `<li class="favorite-filter-item" data-category="all">
                          <button type="button" class="favorite-filter-btn favorite-active-btn all-category">
                            All categories
                          </button>
                        </li >`;

  favoriteFilterEl.innerHTML = allCategoryBtn;

  favoriteFilterEl.insertAdjacentHTML('beforeend', markup);
}

function findProductByFilter(elem) {
  const arrFromLocalStorage = JSON.parse(localStorage.getItem(KEY_FAVORITE));
  const searchCategory = elem.closest('.favorite-filter-item').dataset.category;
  if (searchCategory === 'all') {
    btnAllCategory.classList.add('in-focus');
    focusOnAllCategoryBtn += 1;
    return arrFromLocalStorage;
  }
  return arrFromLocalStorage.filter(
    ({ category }) => category === searchCategory
  );
}

let pagination = new Pagination('pagination', {
  totalItems: favoriteArrFromLocalStorage.length,
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
  currentPage = eventData.page;
  start = itemsPerPage * currentPage - itemsPerPage;
  end = start + itemsPerPage;
  partOfArr = favoriteArrFromLocalStorage.slice(start, end);
  createCardTemplate(partOfArr, favoriteRecipesListEl);
  const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
  checkHeartEl.forEach(item => (item.checked = true));
});