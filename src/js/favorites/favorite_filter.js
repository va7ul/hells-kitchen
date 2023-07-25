import { getAllCategories } from '../api';
import { createCardTemplate } from '../card_template';
import { KEY_FAVORITE } from './favorite_recipes';


const favoriteFilterEl = document.querySelector('.favorite-filter-list');
const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');

// const favoriteArrFromLocalStorage =
//   JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

getAllCategories()
  .then(data => {
    if (data.length === 0) {
      throw new Error();
    }
    const markup = data
      .map(
        ({ name }) =>
          `<li class="favorite-filter-item" data-category="${name}">
             <button type="button" class="favorite-filter-btn">
            ${name}
             </button>
            </li>`
      )
      .join('');

    favoriteFilterEl.insertAdjacentHTML('beforeend', markup);
  })
  .catch(error =>
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    )
  );


favoriteFilterEl.addEventListener('click', onClick);


function onClick(evt) {
  if (evt.target.classList.contains('favorite-filter-btn')) {
    const findProduct = findProductByFilter(evt.target);
    createCardTemplate(findProduct, favoriteRecipesListEl);
  }
}

function findProductByFilter(elem) {
  const searchCategory = elem.closest('.favorite-filter-item').dataset.category;
  const favoriteArrFromLocalStorage =
    JSON.parse(localStorage.getItem(KEY_FAVORITE));
  return favoriteArrFromLocalStorage.map(
    ({ category }) => category === searchCategory
  );
}
