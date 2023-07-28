import { getRecipeById } from '../api';
import { createCardTemplate } from '../card_template';
import { save } from '../api';
import { dataRecipes } from '../all_recipes';

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
    let current_tags = '';
    for (let i = 0; i < recipe.tags.length; i++) {
      if (recipe.tags[i] !== '') {
        current_tags += '<li class="modal_tag">#' + recipe.tags[i] + '</li>';
      }
    }

    let current_ingredients = '';
    for (let i = 0; i < recipe.ingredients.length; i++) {
      current_ingredients += `<div class="modal_ingredient"><span>${recipe.ingredients[i].name}</span><span>${recipe.ingredients[i].measure}</span></div>`;
    }

    let current_stars = ratingStars(recipe.rating);

    let current_youtube = '';
    if (recipe.youtube) {
      current_youtube = recipe.youtube.replace('watch?v=', 'embed/');
    }

    const transformedRecipe = `
    <div id="bg_modal" class="bg_modal"></div>
    <div class="popup_modal">
      <div class="popup_scroll">
        <a id="pop-up-close" class="modal_close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
    
        <div class="modal_container">
          <h4 class="modal_title">${recipe.title}</h4>
          <iframe class="modal_video" src="${current_youtube}" referrerpolicy="no-referrer"></iframe>
          <div class="modal_line">

            <ul class="modal_tags">
              ${current_tags}
            </ul>

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

          <div class="modal_description">${recipe.instructions}</div>

          <div class="modal_buttons">
            <div class="modal_button modal_favourite "data-id="${recipe._id}" >
            <button class="modal-add-btn" data-id="${recipe._id}">Add to favorite</button>  
          <button class="modal-remove-btn" data-id="${recipe._id}">Remove from favorite</button>
              
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
      });

    // Закриття модалки при натисканні в будь-якому місці екрану
    document.getElementById('bg_modal').addEventListener('click', function () {
      modalRestore(recipe);
    });

    // обробник подій натискання на клавішу
    document.addEventListener('keydown', function (event) {
      const key = event.key || event.keyCode;
      // Перевірка натискання ESC (код клавиші ESC: 27)
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        modalRestore(recipe);
      }
    });

    const removeBtnEl = document.querySelector('.modal-remove-btn');
    const addBtnEl = document.querySelector('.modal-add-btn');

    // let favoritesArray = JSON.parse(localStorage.getItem(KEY_FAVORITE));
    // console.log(favoritesArray);

    // const inStoredge = favoritesArray.some(({ _id }) => _id === recipe._id);
    // if (inStoredge) {
    //   addBtnEl.classList.add('is-hidden');
    //   removeBtnEl.classList.remove('is-hidden');
    // } else {
    //   addBtnEl.classList.remove('is-hidden');
    //   removeBtnEl.classList.add('is-hidden');
    // }

    const btnEl = document.querySelector('.modal_favourite');
    btnEl.addEventListener('click', onClick);
    removeBtnEl.addEventListener('click', removeForBtn);

    function onClick(evt) {
      //   //додати до favorites
      if (!evt.target.classList.contains('modal-add-btn')) {
        return;
      } else {
        const recipeId = recipe._id;

        addToFavorites(recipe._id);
        addBtnEl.classList.add('is-hidden');
        removeBtnEl.classList.remove('is-hidden');
      }

      //видалення з favorites
    }

    function removeForBtn(evt) {
      // const productId = evt.currentTarget.dataset.id;
      removeFromFavorites(KEY_FAVORITE, favoritesArray);
      addBtnEl.classList.remove('is-hidden');
      removeBtnEl.classList.add('is-hidden');
    }

    function addToFavorites(event) {
      if (favoritesArray.find(({ _id }) => _id === recipe._id) === undefined) {
        // const item = dataRecipes.find(({ _id }) => _id === recipeId)
        favoritesArray.push(recipe);
        save(KEY_FAVORITE, favoritesArray);
      }
    }

    function removeFromFavorites(key, arr) {
      const removeElemIdx = arr.findIndex(item => item._id === recipe._id);

      arr.splice(removeElemIdx, 1);
      localStorage.setItem(key, JSON.stringify(arr));
    }
  });
}

export { popUpFunction };
export { ratingStars };
