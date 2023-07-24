import {getRecipeById} from "./api";

function createCardTemplate(data, list) {
   const markup = data.map(({ _id, preview, title, description, rating, area, ingredients, time }) =>
     `<div class="card-template" data-id="${_id}" data-area="${area}" data-ingredients="${ingredients}" data-time="${time}">
    <label>
        <input
      type="checkbox"
      class="js-add-to-fav add-to-fav"/>
      <span class="heart-checkbox"></span>
      </label>

    <img src="${preview}" alt="${title}" class="card-template-img" />
    <div class="card-template-info">
    <h2 class="card-template-title">${title}</h2>
  <p class="card-template-descr">${description}</p>
  <div class="card-template-rating-and-btn">
  <div class="card-template-rating">${rating}</div>
  <button id="pop-up-modal-toogle" class="card-template-btn" type="button" data-id="${_id}")">See recipe</button>
  </div>
  </div>
  
</div>`).join('');
  // console.log(markup);
    list.innerHTML = markup;
}

function onButtonClick(event) {
  const button = event.target;
  const _id = button.dataset.id;
  popUpFunction(_id);
}

document.addEventListener('click', function(event) {
  if (event.target && event.target.matches('.card-template-btn')) {
      onButtonClick(event);
  }
});

function popUpFunction(_id) {
  const modal_popup = document.querySelector('.pop-up-recipe');
  getRecipeById(_id).then((recipe) => {
    console.log(recipe);
    const transformedRecipe = `
    <div id="pop-up-modal-recipe" class="pop-up-modal-recipe">
    <div id="modal" class="container">
        ${recipe.title}
        <button type="button" class="pop-up-close-btn">
            <svg class="icon-close" width="20" height="20">
                <use href="/images/favicon.ico#krestik-modalka"></use>
            </svg>
        </button>
         
        <div class="pop-up-wrap">
            <div class="pop-up-info">
                <div class="pop-up-video">
                    <div class="pop-up-poster">
                        <!-- <img class="recipes" src="#" alt="video-recipes"> -->
                        2
                    </div>
                    <div class="pop-up-overlay">
                        <button type="button" class="pop-up-btn-openYouTube youTube-BTN">
                        <iframe width="420" height="315"
src="${recipe.youtube}">
</iframe>
                            <!-- <svg class="youTube-icon" width="38" height="38">
                                <use href=" "></use>
                            </svg> -->
                            3
                        </button>
                    </div>
                    <div class="trailer-box">
                        <button type="button" class="tiezer-close-btn">
                            <!-- <svg class="icon-close trailer" width="25" height="25">
                                <use href="/images/favicon.ico#krestik-modalka"></use>
                            </svg> -->
                            4
                        </button>
                        <div class="tiezer">5</div>
                    </div>
                </div>
                <div class="pop-up-information">
                    <h2 id="modal-title" class="pop-up-title">empty</h2>
                    <div>
                        <div class="all-rating">
                            <div class="pop-up-rating"></div>
                            <div class="pop-up-time">40 min</div>
                        </div>
                    </div>
                    <div class="pop-up-recipes-container">
                        <ul class="recipes-list">6</ul>
                    </div>
                </div>
            </div>
            <div class="pop-up-tags">
                <ul class="tags-list">7</ul>
            </div>
            <p class="pop-up-description">some text</p>
            <div class="pop-up-buttons-add">
                <button type="button" id="btn-add" class="pop-up-addToFavorites">Add to favorite </button>
                <button type="button" id="btn-remove" class="pop-up-removeFromFavorites">Remove from favorite </button>
            </div>
        </div>
    </div>
</div>
    `).join('');
    modal_popup.innerHTML = transformedRecipe;
  })
}

export {createCardTemplate}