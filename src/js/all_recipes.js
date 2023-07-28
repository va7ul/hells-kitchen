import { getRecipes } from './api';
import { createCardTemplate } from './card_template';
import {
  addToFavorites,
  isInFavorites,
  favoritesArray,
} from './add-to-favorites';
import { pagination } from './pagination';
import Notiflix from 'notiflix';

const cardsGallery = document.querySelector('.cards-gallery');
let dataRecipes = [];

fetchRecipes();

async function fetchRecipes() {
  try {
    dataRecipes = await getRecipes({ page: 1 });
    const recipeCard = document.querySelector('.card-template');
    createCardTemplate(dataRecipes, cardsGallery);
    isInFavorites(dataRecipes, favoritesArray);
    cardsGallery.addEventListener('change', addToFavorites);
    return dataRecipes;
  } catch (error) {
    onError(error);
  }
  console.log(dataRecipes);
}

function onError(error) {
  Notiflix.Notify.failure(error.message);
}



export { fetchRecipes, dataRecipes };
