//import
import { createCardTemplate } from '../card_template';

const KEY_FAVORITE = 'favorite';



function createModal(product) {
  console.log(product);
}
//import

// Для тестування

// function createCardTemplate(data, list) {
//   const markup = data
//     .map(
//       ({ _id, preview, title, description, rating, area, ingredients, time }) =>
//         `<li class="card-template" data-id="${_id}" data-area="${area}" data-ingredients="${ingredients}" data-time="${time}">
//     <img src="${preview}" alt="${title}" class="card-template-img" />
//     <div class="card-template-info">  <h2 class="card-template-title">${title}</h2>
//   <p class="card-template-descr">${description}</p>
//   <div class="card-template-descr">${rating}</div>
//   <button class="card-template-btn" type="button">See recipe</button>
//     <button class="favorite" type="button">Favorite</button>
//   </div>
// </li>`
//     )
//     .join('');

//   list.innerHTML = markup;
// }



import axios from 'axios';
const favoriteArr = [];
const id = [
  '6462a8f74c3d0ddd288980d4',
  '6462a8f74c3d0ddd28897fb8',
  '6462a8f74c3d0ddd28897fbd',
  '6462a8f74c3d0ddd28897fbb',
  '6462a8f74c3d0ddd28897fba',
  '6462a8f74c3d0ddd288980d4',
  '6462a8f74c3d0ddd28897fb8',
  '6462a8f74c3d0ddd28897fbd',
  '6462a8f74c3d0ddd28897fbb',
  '6462a8f74c3d0ddd28897fba',
  '6462a8f74c3d0ddd288980d4',
  '6462a8f74c3d0ddd28897fb8',
  '6462a8f74c3d0ddd28897fbd',
  '6462a8f74c3d0ddd28897fbb',
  '6462a8f74c3d0ddd28897fba',
];

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

async function getProduct() {
  for (let i = 0; i < id.length; i += 1) {
    let item = await getProductList(id[i]);
    favoriteArr.push(item);
  }
  console.log(favoriteArr);
  localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));
}

async function getProductList(id) {
  const response = await axios.get(`${BASE_URL}recipes/${id}`);
  const data = response.data;
  return data;
}

getProduct();
// Для тестування

const favoriteRecipesListEl = document.querySelector('.favorite-recipes-list');
const emptyStorageEl = document.querySelector('.empty-storage-wrapper');
console.log(emptyStorageEl);

const favoriteArrFromLocalStorage =
  JSON.parse(localStorage.getItem(KEY_FAVORITE)) ?? [];

if (favoriteArrFromLocalStorage.length !== 0) {
  createCardTemplate(favoriteArrFromLocalStorage, favoriteRecipesListEl);
} else {
  emptyStorageEl.classList.remove('is-hidden');
}

favoriteRecipesListEl.addEventListener('click', onClick);

function onClick(evt) {
  //відкриття модалки
  if (evt.target.classList.contains('card-template-btn')) {
    const product = findProduct(evt.target);
    createModal(product);
  }
  //видалення з favorites
  if (evt.target.classList.contains('favorite')) {
    removeFromFavorites(evt.target, favoriteArrFromLocalStorage);
    evt.target.closest('.card-template').remove();
  }
}

function findProduct(elem) {
  const productId = elem.closest('.card-template').dataset.id;
  return favoriteArrFromLocalStorage.find(({ _id }) => _id === productId);
}

function removeFromFavorites(elem, arr) {
  const productId = elem.closest('.card-template').dataset.id;
  const removeElemIdx = arr.findIndex(
    item => item._id === productId
  );
  arr.splice(removeElemIdx, 1);
  localStorage.setItem(
    KEY_FAVORITE,
    JSON.stringify(arr)
  );
}

export { removeFromFavorites };