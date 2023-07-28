import { dataRecipes } from "./all_recipes";
import { save } from "./api";
import { removeFromFavorites } from "./api";

const KEY_FAVORITE = 'favorite';
const favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

function addToFavorites(event) {
  console.log(event);
  console.log(event.currentTarget);
  console.log(event.target.closest('.card-template').dataset.id);
  const recipeId = event.target.closest('.card-template').dataset.id;
  if (!favoritesArray.length) {
    const item = dataRecipes.find(({ _id }) => _id === recipeId);
    console.log(item);
    favoritesArray.push(item);
    save(KEY_FAVORITE, favoritesArray);
    return
  } 

  if (favoritesArray.find(({ _id }) => _id === recipeId) === undefined) {
    console.log(favoritesArray);
    const item = dataRecipes.find(({ _id }) => _id === recipeId);
    favoritesArray.push(item);
    save(KEY_FAVORITE, favoritesArray);
  } else {
    removeFromFavorites(KEY_FAVORITE, event.target, favoritesArray);
  }

  async function isInFavorites (recipeArray, favoritesArray){
    for (i = 0; i < favoritesArray.length; i+= 1){
      const recipeFav = recipeArray.find(({ _id }) => _id === favoritesArray[i]._id)
        if(recipeFav._id === favoritesArray[i]._id){
      const recipeCardEl = document.querySelector(`.card-template[data-id="${recipeFav._id}"]`)
      recipeCardEl.firstElementChild.firstElementChild.checked = true;
      } else{
      return   
      }
  }
  }
export {addToFavorites, isInFavorites, favoritesArray}