import { getAllCategories } from '../api';
import { createCardTemplate } from '../card_template';
import { KEY_FAVORITE } from './favorite_recipes';

const favoriteFilterEl = document.querySelector('.favorite-filter-list');
const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');

const favoriteArrFromLocalStorage =
  JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

filterMarkup();

function filterMarkup() {
  const allCategories = favoriteArrFromLocalStorage.flatMap(
    product => product.category
  );
  const uniqueCategories = allCategories.filter(
    (category, index, array) => array.indexOf(category) === index
  );
  const markup = uniqueCategories
    .map((category) =>
      `<li class="favorite-filter-item" data-category="${category}">
             <button type="button" class="favorite-filter-btn">
            ${category}
             </button>
            </li>`
    )
    .join('');
  favoriteFilterEl.insertAdjacentHTML('beforeend', markup);
}
// getAllCategories()
//   .then(data => {
//     if (data.length === 0) {
//       throw new Error();
//     }

//     const markup = data
//       .map(function ({ name }) {
//         if (uniqueCategories.includes(name)) {
//           console.log(name)
//           `<li class="favorite-filter-item" data-category="${name}">
//              <button type="button" class="favorite-filter-btn">
//             ${name}
//              </button>
//             </li>`;
//         }
//       })
//       .join('');

//     favoriteFilterEl.insertAdjacentHTML('beforeend', markup);
//   })
//   .catch(error => Notify.failure('Oops! Something went wrong!'));

favoriteFilterEl.addEventListener('click', onClick);

function onClick(evt) {
  if (evt.target.classList.contains('favorite-filter-btn')) {
    const findProduct = findProductByFilter(evt.target);
    console.log(findProduct);
    createCardTemplate(findProduct, favoriteRecipesListEl);
     const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
    checkHeartEl.forEach(item => (item.checked = true));
    filterMarkup();
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
