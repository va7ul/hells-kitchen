import { createCardTemplate } from '../card_template';
import { KEY_FAVORITE } from './favorite_recipes';

const favoriteFilterEl = document.querySelector('.favorite-filter-list');
const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const btnAllCategory = document.querySelector('.all-category');

let favoriteArrFromLocalStorage =
  JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];
let focus = 0;

const allCategories = favoriteArrFromLocalStorage.flatMap(
  product => product.category
);

const uniqueCategories = allCategories.filter(
  (category, index, array) => array.indexOf(category) === index
);

uniqueCategories.sort((a, b) => a.localeCompare(b));

createFilterMarkup(uniqueCategories);

favoriteFilterEl.addEventListener('click', onClick);
favoriteRecipesListEl.addEventListener('click', removeHandler);

function onClick(evt) {
  if (evt.target.classList.contains('favorite-filter-btn')) {
    btnAllCategory.classList.remove('favorite-active-btn');
    if (focus != 0) {
      const btnInFocus = document.querySelector(
        '.favorite-filter-btn.in-focus'
      );
      btnInFocus.classList.remove('in-focus');
      focus = 0;
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
      btn.firstElementChild.classList.add('in-focus');
      focus += 1;
      return;
    } else {
      const btn = document.querySelector(
        `li[data-category="${product.category}"]`
      );
      btn.remove();
       focus = 0;
      if (favoriteArrFromLocalStorage.length === 0) {
        btnAllCategory.remove();
      }
    }
  }
}

function findProductByFilter(elem) {
  const favoriteArrFromLocalStorage = JSON.parse(
    localStorage.getItem(KEY_FAVORITE)
  );
  const searchCategory = elem.closest('.favorite-filter-item').dataset.category;
  if (!searchCategory) {
    return favoriteArrFromLocalStorage;
  }
  return favoriteArrFromLocalStorage.filter(
    ({ category }) => category === searchCategory
  );
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
  favoriteFilterEl.insertAdjacentHTML('beforeend', markup);
}
