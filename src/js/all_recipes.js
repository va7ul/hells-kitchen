import { getRecipes } from "./api";
import { createCardTemplate } from "./card_template";

const cardsGallery = document.querySelector('.cards-gallery');
const favorites = [];
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

  function addToFavorites(event){
    const recipeId = event.target.closest('.card-template').dataset.id;
    favoriteRecipe = findRecipe(recipeId);
    console.log(favorites)
  }

function findRecipe(recipeId){
   const item = dataRecipes.find(({ _id }) => _id === recipeId)
   if (favorites.find(({_id}) => _id === recipeId) === undefined){
    favorites.push(item)
   }
   else{
    removeFromFavorites()
   }
}

export {fetchRecipes}