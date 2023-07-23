import axios from 'axios';
// import { notifyError } from '../notifications';

// export default class RecipeApiService {
//   constructor() {
//     this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
//     this.category = '';
//     this.page = 1;
//     this.limit = 6;
//     this.time = '';
//     this.area = '';
//     this.ingredients = '';
//     this.recipeId = '';
//   }

//   async getCooksEvents() {
//     const url = `${this.BASE_URL}/events`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   async getCategories() {
//     const url = `${this.BASE_URL}/categories`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   async getRecipe() {
//     const url = `${this.BASE_URL}/recipes?category=${this.category}&page=${this.page}&limit=${this.limit}&time=${this.time}&area=${this.area}&ingredients=${this.ingredients}`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   async getPopular() {
//     const url = `${this.BASE_URL}/recipes/popular`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   async getRecipeById() {
//     const url = `${this.BASE_URL}/recipes/${this.recipeId}`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   // !!! PATCH RATING  !!!//
//   async patchRatingById() {
//     const url = `${this.BASE_URL}/recipes/${this.recipeId}/rating`;
//     try {
//       const response = await axios.patch(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   async getIngredients() {
//     const url = `${this.BASE_URL}/ingredients`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   async getAreas() {
//     const url = `${this.BASE_URL}/areas`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }

//   // !!! POST ORDER  CHECK DOCS!!!//
//   async postOrder() {
//     const url = `${this.BASE_URL}/recipes/${this.recipeId}/orders/add`;
//     try {
//       const response = await axios.post(url);
//       return response.data;
//     } catch (error) {
//       notifyError(error);
//     }
//   }
// }

axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api';

async function getAllCategories() {
  const url = `/categories`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// params = {
//   category: '',
//   page: 1,
//   limit: 6,
//   time: '',
//   area: '',
//   ingredients: '',
//   recipeId: '',
// };

// let { category, page, limit, time, area, ingredients, recipeId } = params;

// const params = {
//   category: '',
//   page: 1,
//   limit: 6,
//   time: '',
//   area: '',
//   ingredients: '',
//   recipeId: '',
// };

// localStorage.setItem('params', JSON.stringify(params));

localStorage.setItem('category', '');
localStorage.setItem('page', 1);
localStorage.setItem('limit', 9);
localStorage.setItem('time', '');
localStorage.setItem('area', '');
localStorage.setItem('ingredients', '');

async function getRecipe() {
  category = localStorage.getItem('category');
  page = localStorage.getItem('page');
  limit = localStorage.getItem('limit');
  time = localStorage.getItem('time');
  area = localStorage.getItem('area');
  ingredients = localStorage.getItem('ingredients');

  const url = `/recipes?category=${category}&page=${page}&limit=${limit}&time=${time}&area=${area}&ingredients=${ingredients}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getAllCategories, getRecipe };
