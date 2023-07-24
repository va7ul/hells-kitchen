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
  <button class="card-template-btn" type="button">See recipe</button>
  </div>
  </div>
  
</div>`).join('');
 
    list.innerHTML = markup;
}

export {createCardTemplate}