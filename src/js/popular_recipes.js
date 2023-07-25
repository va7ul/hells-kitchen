import axios from 'axios';

const popularListEl = document.querySelector('.js-popular-list');

const BASE_API_POPULAR = 'https://tasty-treats-backend.p.goit.global/api/';

async function getPopularRecipesApi() {
  return await axios.get(`${BASE_API_POPULAR}recipes/popular`);
}
getPopularRecipesMarkup();

async function getPopularRecipesMarkup() {
  const getDataPopularArreySort = (await getPopularRecipesApi()).data.sort(
    (a, b) => b.popularity - a.popularity
  );

  const getPopularMarkup = getDataPopularArreySort
    .map(({ description, preview, title }) => {
      return `<li class="popular-item">
      <a class="popular-link" href="">
        <img class="popular-image" src="${preview}" alt="${description}"/>
        <div class="popular-wrap-text">
          <h3 class="popular-subtitle">${title}</h3>
          <p class="popular-text js-popular-text">${description}</p>
        </div>
      </a>
    </li>`;
    })
    .join('');

  popularListEl.innerHTML = getPopularMarkup;
  const popularTextEl = document.querySelectorAll('.js-popular-text');

  popularTextEl.forEach(item => {
    item.textContent = item.textContent.slice(0, 120);
    item.textContent = item.textContent + '...';
  });
}
