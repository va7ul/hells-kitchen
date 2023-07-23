import axios from "axios";
import Notiflix from "notiflix";
import { getRecipes } from "./api";
import { createCardTemplate } from "./card_template";

let recipeGalleryPage = 1;
let maxPage = 0;
const cardsGallery = document.querySelector('.cards-gallery');
const URL = `https://tasty-treats-backend.p.goit.global/api/recipes?page=${recipeGalleryPage}&limit=9`;
const favorites = [];
let dataRecipes = [];
fetchRecipes();

  

  async function fetchRecipes() {
    try {
      dataRecipes = await getRecipes();
      console.log(dataRecipes)
      await createCardTemplate(dataRecipes, cardsGallery);
      const recipeCard = document.querySelector('.reciepe-card')
      cardsGallery.addEventListener('change', addToFavorites);
      return dataRecipes;
    } catch (error) {
      onError(error);
    }
  }

  function onError(error) {
    Notiflix.Notify.failure(error.message);
  }


  // function makeRecipeItems(data) {
  //   return data.reduce(
  //     (markup, currentEl) => markup + createGalleryItem(currentEl),
  //     ''
  //   );
  // }

  // function renderGallery(markup) {
  //   cardsGallery.insertAdjacentHTML('beforeend', markup)
  // }

//   function createGalleryItem({
//     area,
//     category,
//     description,
//     ingredients,
//     preview,
//     rating,
//     title,
//     _id,
//   }) {
//     return `<div style="background-image: url('${preview}')"
//     class="reciepe-card">
//     <h3 class="reciepe-card-title">
//         ${title}
//     </h3>
//     <p class="reciepe-card-description">
//     ${description}
//     </p>
//     <span class="reciepe-card-rating">${rating}</span>
//     <span class="reciepe-card-stars">*****</span>
//     <input type="checkbox" class="add-to-fav-btn" data-id = ${_id}>
//     <span data-area = ${area}>
//      </input>
// </div>`;
//   }

  function addToFavorites(event){
    const recipeId = event.target.dataset.id;
    favoriteRecipe = findRecipe(recipeId);
    console.log(favorites)
  }

function findRecipe(recipeId){
   const item = dataRecipes.find(({ _id }) => _id === recipeId)
   favorites.push(item)

}
