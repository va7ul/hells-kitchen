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
  console.log(modal_popup)
  getRecipeById(_id).then((recipe) => {
    console.log(recipe);
    const transformedRecipe = `
    <div class="bg_modal"></div>
    <div class="modal">
      <div class="modal_close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
  
      <div class="modal_container">
        <h4 class="modal_title">Mozarella</h4>
        <iframe class="modal_video" src="https://www.youtube.com/embed/tgbNymZ7vqY" referrerpolicy="no-referrer" ></iframe>
        <div class="modal_line">
          <div class="modal_tags">
            <a href="" class="modal_tag">#hello</a>
            <a href="" class="modal_tag">#hello</a>
            <a href="" class="modal_tag">#hello</a>
          </div>
          <div class="modal_right">
            <div class="modal_rating">
              <span>4.5</span>
              <div class="modal_rating_stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="grey"/>
                </svg>
              </div>
            </div>
            <div class="modal_time">40 min</div>
          </div>
        </div>
  
        <div class="modal_ingredients">
          <div class="modal_ingredient"><span>banana</span><span>1 large</span></div>
          <div class="modal_ingredient"><span>banana</span><span>1 large</span></div>
          <div class="modal_ingredient"><span>banana</span><span>1 large</span></div>
          <div class="modal_ingredient"><span>banana</span><span>1 large</span></div>
          <div class="modal_ingredient"><span>banana</span><span>1 large</span></div>
          <div class="modal_ingredient"><span>banana</span><span>1 large</span></div>
        </div>
        <div class="modal_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, sequi voluptates adipisci perspiciatis, ad expedita vitae. Repellendus ex fuga quia, nobis quas odio tempore ab aliquid. Sit eius, molestias necessitatibus!</div>
        <div class="modal_buttons">
          <div class="modal_button modal_favourite">
            <button>Add to favourite</button>
          </div>
          <div class="modal_button modal_rating_button">
            <button>Give a rating</button>
          </div>
        </div>
      </div>
    </div>
    `).join('');
    modal_popup.innerHTML = transformedRecipe;
  })
}

export {createCardTemplate}