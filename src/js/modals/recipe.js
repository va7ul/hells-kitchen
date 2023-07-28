import { getRecipeById } from '../api';
import { save } from '../api';
import { createCardTemplate } from "../card_template";
const KEY_FAVORITE = 'favorite';

let favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE));

function checkRecipeCard(item) {
  const recipeCardCheck = document.querySelector('.js-add-to-fav');
}

function ratingStars(rating) {
  let current_rating = Math.round(rating);
  let current_stars = '';
  for (let i = 0; i < current_rating; i++) {
    current_stars += `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
            <path xmlns="http://www.w3.org/2000/svg" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z" fill="#EEA10C"/>
        </svg>`;
  }
  for (let i = 0; i < 5 - current_rating; i++) {
    current_stars += `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
            <path xmlns="http://www.w3.org/2000/svg" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z" fill="gray"/>
        </svg>`;
  }
  return current_stars;
}

function modalRestore(recipe) {
  const popUpRecipes = document.querySelectorAll('.pop-up-recipe');
  popUpRecipes.forEach(function (recipe) {
    recipe.innerHTML = '';

    let body = document.querySelector('body');
    body.style.overflow = 'auto';
  });
}

function popUpFunction(_id) {
  const modal_popup = document.querySelector('.pop-up-recipe');

  getRecipeById(_id).then(recipe => {
    // перебір тегів для html
    let current_tags = '';
    for (let i = 0; i < recipe.tags.length; i++) {
      if (recipe.tags[i] !== '') {
        current_tags += '<li class="modal_tag">#' + recipe.tags[i] + '</li>';
      }
    }

    // перебір інгредієнтів для html
    let current_ingredients = '';
    for (let i = 0; i < recipe.ingredients.length; i++) {
      current_ingredients += `<div class="modal_ingredient"><span>${recipe.ingredients[i].name}</span><span>${recipe.ingredients[i].measure}</span></div>`;
    }

    let current_stars = ratingStars(recipe.rating);

    // очистка url відео, аби не скаржився браузер
    let current_youtube = '';
    if (recipe.youtube) {
      current_youtube = recipe.youtube.replace('watch?v=', 'embed/');
    }

    //перевірка улюбленого при завантажені модалки
    function checkFav(id){
      let favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE));
      if (favoritesArray !== null){ //якщо улюблені вже існують
        if (favoritesArray.find(({ _id }) => _id === id)) { //якщо серед них вже є рецепт з id з параметру
          return true; 
        } 
      } else {
        return false;
      }
    }

    //улюблені
    let current_fav = "";
    if (!checkFav(recipe._id)){ //якщо не улюблений, додати й навпаки
      current_fav = `<button class="modal-fav-add-btn" data-id="${recipe._id}">Add to favorites</button> <!-- в кнопку передається id -->`;
    }
    else{
      current_fav = `<button class="modal-fav-add-btn modal-fav-remove-btn" data-id="${recipe._id}">Remove from favorites</button> <!-- в кнопку передається id -->`;
    }

    // заповнення html
    const transformedRecipe = `
    <div id="bg_modal" class="bg_modal"></div> <!--фон, натиск на нього відслідковується для закриття-->
    <div class="popup_modal">
      <div class="popup_scroll">
        <a id="pop-up-close" class="modal_close"> <!-- натиск відслідковується для закриття -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <div class="modal_container">
          <h4 class="modal_title">${recipe.title}</h4>
          <iframe class="modal_video" src="${current_youtube}" referrerpolicy="no-referrer"></iframe>
          <div class="modal_line">
            <div class="modal_right">
              <div class="modal_rating">
                <span>${recipe.rating}</span>
                <div class="modal_rating_stars">
                  ${current_stars}
                </div>
              </div>
              <div class="modal_time">${recipe.time} min</div>
            </div>
          </div>
          <div class="modal_ingredients">
            ${current_ingredients}
          </div>
          <ul class="modal_tags">
            ${current_tags}
          </ul>
          <div class="modal_description">${recipe.instructions}</div>
          <div class="modal_buttons">
            <div class="modal_button modal_favourite "data-id="${recipe._id}" >
              ${current_fav}
            </div>
            <div class="modal_button modal_rating_button">
              <button class="rating-modal-btn-open" data-id="${recipe._id}">Give a rating</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    modal_popup.innerHTML = transformedRecipe;

    let body = document.querySelector('body');
    body.style.overflow = 'hidden';

    // Закриття модалки при натисканні на хрестик
    document
      .getElementById('pop-up-close')
      .addEventListener('click', function () {
        modalRestore(recipe);
        fetchRecipes();
      });

    // Закриття модалки при натисканні в будь-якому місці екрану
    document.getElementById('bg_modal').addEventListener('click', function () {
      modalRestore(recipe);
      fetchRecipes();
    });

    // обробник подій натискання на клавішу
    document.addEventListener('keydown', function (event) {
      const key = event.key || event.keyCode;
      // Перевірка натискання ESC (код клавиші ESC: 27)
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        modalRestore(recipe);
        fetchRecipes();
      }
    });

    const btnEl = document.querySelector('.modal_favourite');
    btnEl.addEventListener('click', onClick);

    function onClick(event) {
      let addFavButton = document.querySelector('.modal-fav-add-btn');
      let remFavButton = document.querySelector('.modal-fav-remove-btn');
      const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
      if (event.target == addFavButton && event.target !== remFavButton) {
        addToFavorites(recipe._id);
        addFavButton.classList.add("modal-fav-remove-btn");
        addFavButton.innerHTML = "Remove from favorites";
        // сердечко по id
        checkHeartEl.forEach((item) => {
          if (item.dataset.id === recipe._id){
            item.checked = true;
          }
        })
      } else if (event.target == remFavButton) {
        removeFromFavorites(recipe._id);
        remFavButton.classList.remove("modal-fav-remove-btn");
        remFavButton.innerHTML = "Add to favorites";
        // сердечки
        checkHeartEl.forEach((item) => {
          if (item.dataset.id === recipe._id){
            item.checked = false;
          }
        })
      }
    }

    function addToFavorites(id) {
      let favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE)); //перевірка локального сховища, результат списком
      if (favoritesArray === null){ // при першому записі список пустий
        save(KEY_FAVORITE, [recipe]); //запис списком для відповідності типів
      }
      else if (!favoritesArray.find(({ _id }) => _id === id)) { //якщо не!знайдено таку саму айдішку (саме з параметра = важливо для сердечка)
        favoritesArray.push(recipe); //дописування, зберігаючи минуле
        save(KEY_FAVORITE, favoritesArray);
      }
    }

    function removeFromFavorites(id) {
      let favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE));
      const removeElemIdx = favoritesArray.findIndex(item => item._id === id);
      favoritesArray.splice(removeElemIdx, 1); //зайвий вирізається по id
      if (favoritesArray.length !== 0){
        save(KEY_FAVORITE, favoritesArray);
      } else { //якщо це останній елемент, сам список видаляється, щоб не було багів зі сміттям
        localStorage.removeItem(KEY_FAVORITE);
      }
    }
  });
}

export { popUpFunction };
export { ratingStars };




card template
import {getRecipeById} from "./api";
import { popUpFunction } from "./modals/recipe";
import { ratingStars } from './modals/recipe';

function createCardTemplate(array, list) {
   const markup = array.map(({ _id, preview, title, description, rating, area, ingredients, time }) =>
     `<li class="card-template" data-id="${_id}" data-area="${area}" data-ingredients="${ingredients}" data-time="${time}">
      <label>
        <input type="checkbox" data-id="${_id}" class="js-add-to-fav add-to-fav"/>
        <span class="heart-checkbox"></span>
      </label>

    <img src="${preview}" alt="${title}" class="card-template-img" />
    <div class="card-template-info">
    <h2 class="card-template-title">${title}</h2>
  <p class="card-template-descr">${description}</p>
  <div class="card-template-rating-and-btn">
  <div class="card-template-rating">${rating.toFixed(1)}<span>${ratingStars(rating)}</span></div>
  <button id="pop-up-modal-toogle" class="card-template-btn" type="button" data-id="${_id}">See recipe</button> <!-- в кнопку передається id --> 
  </div>
  </div>
  

</li>`).join('');
    list.innerHTML = markup;
}

function onButtonClick(event) {
  const button = event.target;
  const _id = button.dataset.id;
  popUpFunction(_id); // id з кнопки використовується для пошуку рецепту
}

document.addEventListener('click', function(event) {
  if (event.target && event.target.matches('.card-template-btn')) {
      onButtonClick(event);
  }
});

export {createCardTemplate}