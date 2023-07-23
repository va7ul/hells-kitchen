import axios from 'axios';
import { getAllCategories, getRecipe } from './api';
const allCategoriesEl = document.querySelector('.js-all-categories');
const categoriesListEl = document.querySelector('.js-categories');
const categoriesContainerEl = document.querySelector(
  '.categories-list-container'
);
// const activeCategoryEl = document.querySelector('.active-category');

function createCategoriesList(categories) {
  const markup = categories
    .map(
      category =>
        `<li>
        <button type="button" class="categories-list-item categories-item js-test">${category.name}</button>
        </li>`
    )
    .join('');
  categoriesListEl.insertAdjacentHTML('beforeend', markup);
}

getAllCategories()
  .then(categories => createCategoriesList(categories))
  .catch(error => console.log(error));

categoriesContainerEl.addEventListener('click', onCategory);

function onCategory(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  let selectCategory = evt.target;
  localStorage.setItem('category', selectCategory.textContent);

//   activeCategoryEl.classList.remove('active-category');
//   selectCategory.classList.add('active-category');
}

getRecipe()
  .then(recipe => console.log(recipe))
  .catch(error => console.log(error));
