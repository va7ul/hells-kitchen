import { getAllCategories, resetAllFiters } from './api';
import { fetchRecipes } from './all_recipes';

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

fetchRecipes();

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
  resetAllFiters();

  const activeCategoryEl = document.querySelector('.active-category');
  activeCategoryEl.classList.remove('active-category');
  selectCategory.classList.add('active-category');

  fetchRecipes();
}

// from all recipes.js

// import { pagination } from './pagination';

// const listContainer = document.querySelector('#catalog-list');

// async function populateCardsWithRecipes() {
//   try {
//     const recipesData = await getRecipes(); // Выполняем запрос на получение данных о рецептах
//     createCardTemplate(recipesData, listContainer); // Передаем полученные данные в функцию createCardTemplate
//   } catch (error) {
//     console.error('Ошибка при получении данных о рецептах:', error);
//   }
// }

// populateCardsWithRecipes();

// // Обработчик события, который будет вызываться при изменении текущей страницы пагинации
// pagination.on('afterMove', async (event) => {
//   const currentPage = event.page;
//   try {
//     // Выполняем запрос на получение данных о рецептах с учетом новой текущей страницы
//     const recipesData = await getRecipes({ page: currentPage });

//     // Обновляем карточки рецептов на странице
//     createCardTemplate(recipesData, listContainer);
//   } catch (error) {
//     console.error('Ошибка при получении данных о рецептах:', error);
//   }
// });
