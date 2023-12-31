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