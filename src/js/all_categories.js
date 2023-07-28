import { getAllCategories, resetAllFiters, save } from './api';
import { fetchRecipes } from './all_recipes';
import { resetSelectsToDefault } from './search_filters';
import { pagination } from './pagination';

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
  .then(categories => {
    createCategoriesList(categories);
    save('all categories', categories);
  })
  .catch(error => console.log(error));

categoriesContainerEl.addEventListener('click', onCategory, { passive: true });

function onCategory(evt) {
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

allCategoriesEl.addEventListener('click', onAllCategory, { passive: true });

function onAllCategory(evt) {
  let selectCategory = evt.target;
  resetSelectsToDefault();
  resetAllFiters();
  localStorage.setItem('page', 1);
  pagination.movePageTo(1);

  const activeCategoryEl = document.querySelector('.active-category');
  activeCategoryEl.classList.remove('active-category');
  selectCategory.classList.add('active-category');

  fetchRecipes();
}
