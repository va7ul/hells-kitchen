import { getRecipes} from "./api";
import { createCardTemplate } from "./card_template";
import { addToFavorites, isInFavorites, favoritesArray } from "./add-to-favorites";
import Notiflix from "notiflix";


const cardsGallery = document.querySelector('.cards-gallery');
let dataRecipes = [];

fetchRecipes();

  async function fetchRecipes() {
    try {
      dataRecipes = await getRecipes({ page: 1 });
      const recipeCard = document.querySelector('.card-template');
      createCardTemplate(dataRecipes, cardsGallery);
      isInFavorites(dataRecipes, favoritesArray )
      cardsGallery.addEventListener('change', addToFavorites);
      return dataRecipes;
    } catch (error) {
      onError(error);
    }
  }

   async function fetchRecipesForPagination(page) {
    try {
      dataRecipes = await getRecipes({ page: page });
      const recipeCard = document.querySelector('.card-template');
      createCardTemplate(dataRecipes, cardsGallery);
      isInFavorites(dataRecipes, favoritesArray )
      cardsGallery.addEventListener('change', addToFavorites);
      return dataRecipes;
    } catch (error) {
      onError(error);
    }
  }

  function onError(error) {
    Notiflix.Notify.failure(error.message);
  } 

export { fetchRecipes, dataRecipes, cardsGallery, fetchRecipesForPagination };