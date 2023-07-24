import { getRecipes} from "./api";
import { createCardTemplate } from "./card_template";
import { addToFavorites } from "./add-to-favorites";

const cardsGallery = document.querySelector('.cards-gallery');
let dataRecipes = [];

fetchRecipes();  

  async function fetchRecipes() {
    try {
      dataRecipes = await getRecipes();
      await createCardTemplate(dataRecipes, cardsGallery);
      const recipeCard = document.querySelector('.card-template')
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