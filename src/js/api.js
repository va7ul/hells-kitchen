import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix';

axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api';
function resetAllFiters() {
  localStorage.setItem('category', '');
  resetFilters();
}

function resetFilters() {
  localStorage.setItem('page', 1);
  localStorage.setItem('limit', 9);
  localStorage.setItem('time', '');
  localStorage.setItem('title', '');
  localStorage.setItem('area', '');
  localStorage.setItem('ingredient', '');
}

resetAllFiters();

const save = async (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = async key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

async function getMasterclasses() {
  const url = `/events`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getAllCategories() {
  const url = `/categories`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getPopularRecipes() {
  const url = `/recipes/popular`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getAreas() {
  const url = `/areas`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getIngredients() {
  const url = `/ingredients`;
  Loading.pulse();
  localStorage.setItem('loading', 0);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getRecipes() {
  if (window.innerWidth < 768) {
    localStorage.setItem("limit", 6);
  } else if (window.innerWidth< 1280) {
    localStorage.setItem("limit", 8);
  } else {
    localStorage.setItem("limit", 9);
  }
  let category = localStorage.getItem('category');
  let page = localStorage.getItem('page');
  let limit = localStorage.getItem('limit');
  let title = localStorage.getItem('title');
  let time = localStorage.getItem('time');
  let area = localStorage.getItem('area');
  let ingredient = localStorage.getItem('ingredient');

  

  const url = `/recipes?category=${category}&page=${page}&limit=${limit}&title=${title}&time=${time}&area=${area}&ingredient=${ingredient}`;
  try {
    const response = await axios.get(url);
    localStorage.setItem('totalPages', response.data.totalPages);
    return response.data.results;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getRecipeById(recipeId) {
  const url = `/recipes/${recipeId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function patchRating(recipeId, options) {
  Loading.pulse();
  const url = `/recipes/${recipeId}/rating`;
  try {
    const response = await axios.patch(url, options);
    localStorage.setItem('patch-rating', '');
    return response.data;
  } catch (error) {
    localStorage.setItem('patch-rating', 'error');
    setTimeout(() => {
      Notify.failure('Oops! Something went wrong!');
    }, 500);
  }
}

async function postOrder(options) {
  Loading.pulse();
  const url = `/orders/add`;
  try {
    const response = await axios.post(url, options);
    localStorage.setItem('patch-rating', '');
    return response.data;
  } catch (error) {
    localStorage.setItem('patch-rating', 'error');
    setTimeout(() => {
      Notify.failure('Oops! Something went wrong!');
    }, 500);
  }
}

function removeFromFavorites(key, elem, arr) {
  const productId = elem.closest('.card-template').dataset.id;
  const removeElemIdx = arr.findIndex(item => item._id === productId);
  arr.splice(removeElemIdx, 1);
  localStorage.setItem(key, JSON.stringify(arr));
}

export {
  getMasterclasses,
  getAllCategories,
  getPopularRecipes,
  getAreas,
  getIngredients,
  getRecipes,
  getRecipeById,
  patchRating,
  postOrder,
  resetAllFiters,
  resetFilters,
  save,
  load,
  removeFromFavorites,
};
