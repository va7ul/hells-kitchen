import { createCardTemplate } from '../card_template';
import { KEY_FAVORITE } from './favorite_recipes';
import { checkHeart } from './helpers/check-heart';
import Pagination from 'tui-pagination';
import {
  calculationOfVisibleElements,
  movePage,
  printPagination,
  setPagination,
} from './helpers/favorite-pagination';

const favoriteFilterSectionEl = document.querySelector('.favorite-filter');
const favoriteFilterEl = document.querySelector('.favorite-filter-list');
const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const emptyStorageEl = document.querySelector('.empty-storage-wrapper');
const paginationEl = document.getElementById('pagination');

const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;
let paginationSettings;

let currentPage = 1;
let itemsPerPage = 0;
let visiblePages = 0;
let paginationFilter = null;
let findProductArr = null;
// const focusOnBtn = { isFocusOnBtn: false };
let focusOnAllCategoryBtn = false;

let favoriteArrFromLocalStorage =
  JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

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

function onClick(evt) {
  if (evt.target.classList.contains('favorite-filter-btn')) {
    btnAllCategory.classList.remove('favorite-active-btn');
    if (focusOnAllCategoryBtn) {
      btnAllCategory.classList.remove('in-focus');
      focusOnAllCategoryBtn = false;
    }
    const btnInFocusEl = document.querySelector('.in-focus');
    if (btnInFocusEl) {
      btnInFocusEl.classList.remove('in-focus');
    }
    // if (!focusOnBtn.isFocusOnBtn) {

    //   console.log('focusOnBtn', focusOnBtn);
    //   console.log('btnInFocusEl', btnInFocusEl);

    // }
    const searchCategory = evt.target.closest('.favorite-filter-item').dataset
      .category;
    const btnEl = document.querySelector(
      `li[data-category="${searchCategory}"]`
    );
    findProductArr = findProductByFilter(searchCategory);

    paginationSettings = setPagination(
      mainElementWidth,
      paginationEl,
      findProductArr
    );

    itemsPerPage = paginationSettings.itemsPerPage;
    visiblePages = paginationSettings.visiblePages;

    let partOfArr = calculationOfVisibleElements(
      itemsPerPage,
      currentPage,
      findProductArr
    );
    createCardTemplate(partOfArr, favoriteRecipesListEl);
    checkHeart();
    let paginationAll = new Pagination(
      'pagination',
      printPagination(findProductArr, itemsPerPage, visiblePages)
    );
    console.log('paginationFilter', paginationFilter);
    paginationAll.on('afterMove', eventData =>
      movePage(
        eventData,
        findProductArr,
        itemsPerPage,
        currentPage,
        favoriteRecipesListEl,
        btnEl,
      )
    );
  }
}

function removeHandler(evt) {
  if (evt.target.classList.contains('js-add-to-fav')) {
    const productId = evt.target.closest('.card-template').dataset.id;
    const product = favoriteArrFromLocalStorage.find(
      ({ _id }) => _id === productId
    );
    findProductArr = findProductByFilter(product.category);
    console.log('paginationFilter', paginationFilter);
    if (paginationFilter) {
      paginationFilter._options.totalItems = findProductArr.length;
    }

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

        // focusOnBtn.isFocusOnBtn = true;
      }
      return;
    } else {
      const btn = document.querySelector(
        `li[data-category="${product.category}"]`
      );
      btn.remove();
      // focusOnBtn.isFocusOnBtn = false;
      if (!btnAllCategory.classList.contains('favorite-active-btn')) {
        btnAllCategory.classList.add('in-focus');
        findProductArr = findProductByFilter('all');

        paginationSettings = setPagination(
          mainElementWidth,
          paginationEl,
          findProductArr
        );

        itemsPerPage = paginationSettings.itemsPerPage;
        visiblePages = paginationSettings.visiblePages;

        let partOfArr = calculationOfVisibleElements(
          itemsPerPage,
          currentPage,
          findProductArr
        );
        createCardTemplate(partOfArr, favoriteRecipesListEl);
        checkHeart();
        paginationFilter = new Pagination(
          'pagination',
          printPagination(findProductArr, itemsPerPage, visiblePages)
        );
        console.log('paginationFilter', paginationFilter);
        paginationFilter.on('afterMove', eventData =>
          movePage(
            eventData,
            findProductArr,
            itemsPerPage,
            currentPage,
            favoriteRecipesListEl,
          )
        );
        console.log('paginationFilter', paginationFilter);

        focusOnAllCategoryBtn = true;
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

function findProductByFilter(searchCategory) {
  const arrFromLocalStorage = JSON.parse(localStorage.getItem(KEY_FAVORITE));
  if (searchCategory === 'all') {
    btnAllCategory.classList.add('in-focus');
    focusOnAllCategoryBtn = true;
    return arrFromLocalStorage;
  }
  return arrFromLocalStorage.filter(
    ({ category }) => category === searchCategory
  );
}
