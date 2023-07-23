import { createCardTemplate } from './card_template';
import { getRecipes } from './api';
import { pagination } from './pagination';

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