import { getRecipes} from "./api";
import { createCardTemplate } from "./card_template";
import { addToFavorites } from "./add-to-favorites";
import { pagination } from "./pagination";
import Notiflix from "notiflix";

const cardsGallery = document.querySelector('.cards-gallery');
let dataRecipes = [];

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

  pagination.on('afterMove', async (event) => {
      const currentPage = event.page;
      localStorage.setItem('page', currentPage)
      try {
        const currentRecipeData = await getRecipes({ page: currentPage });
        createCardTemplate(currentRecipeData, cardsGallery);
      } catch (error) {
        console.error('Ошибка при получении данных о рецептах:', error);
      }});

export {fetchRecipes, dataRecipes}
