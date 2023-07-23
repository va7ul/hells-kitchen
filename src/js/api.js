import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api';

localStorage.setItem('category', '');
localStorage.setItem('page', 1);
localStorage.setItem('limit', 9);
localStorage.setItem('time', '');
localStorage.setItem('title', '');
localStorage.setItem('area', '');
localStorage.setItem('ingredients', '');

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
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getRecipes() {
  category = localStorage.getItem('category');
  page = localStorage.getItem('page');
  limit = localStorage.getItem('limit');
  title = localStorage.getItem('title');
  time = localStorage.getItem('time');
  area = localStorage.getItem('area');
  ingredients = localStorage.getItem('ingredients');

  const url = `/recipes?category=${category}&page=${page}&limit=${limit}&title=${title}&time=${time}&area=${area}&ingredients=${ingredients}`;
  try {
    const response = await axios.get(url);
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

async function patchRating(recipeId) {
  const url = `/recipes/${recipeId}/rating`;
  try {
    const response = await axios.patch(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function postOrder(recipeId) {
  const url = `/recipes/${recipeId}/orders/add`;
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
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
};
