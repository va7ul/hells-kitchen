// list - умовний майбутній список або контейнер для карток

// const listEl = document.querySelector('.all-recipes-list');

//  function fetchAllRecipes() {
//      return fetch('https://tasty-treats-backend.p.goit.global/api/recipes')
//          .then(res => {
//              if (!res.ok) {
//              throw new Error(res.statusText)
//          }
//              return res.json();
//          }).catch(error => console.log(error));
     
// };

function createCardTemplate(data, list) {
   const markup = data.map(({ _id, preview, title, description, rating, area, ingredients, time }) =>
     `<li class="card-template" data-id="${_id}" data-area="${area}" data-ingredients="${ingredients}" data-time="${time}">
    <img src="${preview}" alt="${title}" class="card-template-img" />
    <div class="card-template-info">  <h2 class="card-template-title">${title}</h2>
  <p class="card-template-descr">${description}</p>
  <div class="card-template-descr">${rating}</div>
  <button class="card-template-btn" type="button">See recipe</button>
  </div>
</li>`).join('');
    
    list.innerHTML = markup;
}

export {createCardTemplate}

// fetchAllRecipes().then(data => createCardTemplate(data.results, listEl)).catch(error => console.log(error));



