import axios from 'axios';
import { popUpFunction } from "./modals/recipe";

const popularListEl = document.querySelector('.js-popular-list');
const BASE_API_POPULAR = 'https://tasty-treats-backend.p.goit.global/api/';

async function getPopularRecipesApi() {
  return await axios.get(`${BASE_API_POPULAR}recipes/popular`);
}
getPopularRecipesMarkup();

function popularMarkupFunc(data, list){
  const getPopularMarkup = data.map(({ description, preview, title, _id }) => {
    return `<li class="popular-item">
    <a class="popular-link popular_selector" data-id="${_id}">
      <img class="popular-image popular_selector" data-id="${_id}" src="${preview}" alt="${description}"/>
      <div class="popular-wrap-text popular_selector" data-id="${_id}">
        <h3 class="popular-subtitle popular_selector" data-id="${_id}">${title}</h3>
        <p class="popular-text js-popular-text popular_selector" data-id="${_id}">${description}</p>
      </div>
    </a>
  </li>`;
  })
  .join('');

  list.innerHTML = getPopularMarkup;
}

function onButtonClick(event) {
  const button = event.target;
  const _id = button.dataset.id;
  popUpFunction(_id);
}
document.addEventListener('click', function(event) {
  if (event.target && event.target.matches('.popular_selector')) {
    onButtonClick(event);
  }
});

export {popularMarkupFunc}

async function getPopularRecipesMarkup() {
  const getDataPopularArreySort = (await getPopularRecipesApi()).data.sort(
    (a, b) => b.popularity - a.popularity
  );

  popularMarkupFunc(getDataPopularArreySort, popularListEl);

  const popularTextEl = document.querySelectorAll('.js-popular-text');

  popularTextEl.forEach(item => {
    item.textContent = item.textContent.slice(0, 120);
    item.textContent = item.textContent + '...';
  });
}