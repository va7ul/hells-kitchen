import { getRecipes, save } from "./api";
import { createCardTemplate } from "./card_template";

const cardsGallery = document.querySelector('.cards-gallery');
const favorite = [];
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
    
    console.log(favorite)
  }

function findRecipe(recipeId){
   const item = dataRecipes.find(({ _id }) => _id === recipeId)
   if (favorite.find(({_id}) => _id === recipeId) === undefined){
    favorite.push(item)
    save("KEY_FAVORITE", favorite)
   }
   else{
    removeFromFavorites()
   }
}

export {fetchRecipes, addToFavorites, favorite}