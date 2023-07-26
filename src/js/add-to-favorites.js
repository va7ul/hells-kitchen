import favoritesArray from "./favorites-array";
import { dataRecipes } from "./all_recipes";
import { save } from "./api";
import { removeFromFavorites } from "./api";

const KEY_FAVORITE = 'favorite';

function addToFavorites(event){
    const recipeId = event.target.closest('.card-template').dataset.id;
    const favoriteRecipe = findRecipe(recipeId);
  }

function findRecipe(recipeId){
   const item = dataRecipes.find(({ _id }) => _id === recipeId)
   if (favoritesArray.find(({_id}) => _id === recipeId) === undefined){
    favoritesArray.push(item)
    save(KEY_FAVORITE, favoritesArray)
   }
   else{
    removeFromFavorites(KEY_FAVORITE, item, favoritesArray);
   }
}
export {addToFavorites}