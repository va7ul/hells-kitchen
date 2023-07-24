import { getAllCategories, resetAllFiters } from './api';
import { fetchRecipes } from './all_recipes';
import { resetSelectsToDefault } from './search_filters';

const allCategoriesEl = document.querySelector('.all-categories-btn');
const categoriesListEl = document.querySelector('.categories-list-items');
const categoriesContainerEl = document.querySelector(
  '.categories-list-container'
);

function createCategoriesList(categories) {
  const markup = categories
    .map(
      category =>
        `<li>
        <button type="button" class="categories-list-btn categories-item">${category.name}</button>
        </li>`
    )
    .join('');
  categoriesListEl.insertAdjacentHTML('beforeend', markup);
}

getAllCategories()
  .then(categories => createCategoriesList(categories))
  .catch(error => console.log(error));

categoriesContainerEl.addEventListener('click', onCategory);

async function onCategory(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  let selectCategory = evt.target;
  localStorage.setItem('category', selectCategory.textContent);

  const activeCategoryEl = document.querySelector('.active-category');
  activeCategoryEl.classList.remove('active-category');
  selectCategory.classList.add('active-category');

  fetchRecipes();
}

allCategoriesEl.addEventListener('click', onAllCategory);

async function onAllCategory(evt) {
  let selectCategory = evt.target;
  resetSelectsToDefault();
  resetAllFiters();

  const activeCategoryEl = document.querySelector('.active-category');
  activeCategoryEl.classList.remove('active-category');
  selectCategory.classList.add('active-category');

  fetchRecipes();
}
