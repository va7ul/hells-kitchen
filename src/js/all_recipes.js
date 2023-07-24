import { getRecipes} from "./api";
import { createCardTemplate } from "./card_template";
import { addToFavorites } from "./add-to-favorites";
import { pagination } from "./pagination";
import Notiflix from "notiflix";

const cardsGallery = document.querySelector('.cards-gallery');
let dataRecipes = [];
let currentPage = 1;

fetchRecipes();  

  async function fetchRecipes() {
    try {
      dataRecipes = await getRecipes();      
      const recipeCard = document.querySelector('.card-template')
      createCardTemplate(dataRecipes, cardsGallery)
      cardsGallery.addEventListener('change', addToFavorites);
      return dataRecipes;
    } catch (error) {
      onError(error);
    }
  }

  function onError(error) {
    Notiflix.Notify.failure(error.message);
  }


export {fetchRecipes, dataRecipes}


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

// Обработчик события, который будет вызываться при изменении текущей страницы пагинации
console.log(pagination)
