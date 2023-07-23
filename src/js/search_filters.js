import SlimSelect from "slim-select";
import axios from "axios";
import debounce from "lodash.debounce";

const axios = require('axios');

let totalPages = 0;
let allRecipes = [];
let userInput = "";
const BASE_URL = `https://tasty-treats-backend.p.goit.global/api`;

const inputSearch = document.querySelector(".js-input-home")
const inputForm = document.querySelector(".js-form-home")
const timeOptions = document.querySelector(".js-time")
const areaOptions = document.querySelector(".js-area")
const productOptions = document.querySelector(".js-product")

inputForm.addEventListener("submit", function (evt) { evt.preventDefault()});
inputSearch.addEventListener("input", debounce(onInputSearch, 300));

function onInputSearch(evt) {
        
        
        userInput = evt.target.value.trim();
        console.log(userInput)
        if (userInput === "") {
            return
        }
        getInputSearch(userInput);
}


// Функция getRequestRecipes для запроса одной страницы рецептов и сохранения их в массив allRecipes + подсчет всех страниц (totalPages)
async function getRequestRecipes(page) {
        

        await axios.get(`${BASE_URL}/recipes?page=${page}`)
.then(function (response) {
        if (page === 1) {
            totalPages = response.data.totalPages;
               
        }
         response.data.results.map(el => allRecipes.push(el))
 
  })
.catch(function (error) {
    console.log(error);
  })
}

// Функция getRequestAllRecipes для цикличного вызова функции getRequestRecipes (чтобы перебрать все страницы и забрать все рецепты)
async function getRequestAllRecipes() {
        
        let page = 1;
        await getRequestRecipes(page)
        
        for (let i = 2; i <= totalPages; i += 1){
                page = i;
                getRequestRecipes(page)
                
        }
}

async function getInputSearch(userInput) {

      axios.get(`${BASE_URL}/recipes?title=${userInput}`)
  .then(function (response) {
    
    console.log(response);
  })
  .catch(function (error) {
  
    console.log(error);
  })

}

// Создание времени от 5 до 120 мин
function createTimeOptions() {
        for (i = 5; i <= 120; i += 5){
                const option = `<option value="${i}">${i} min</option>`
            timeOptions.insertAdjacentHTML("beforeend", option)  
        }
        new SlimSelect({
            select: '.js-time',
         settings: {
                showSearch: false,
                placeholderText: '0 min',
  },
     })
}

// Запрос и отрисовка регионов
async function getRegions() {
        await axios.get(`${BASE_URL}/areas`)
  .then(function (response) {
          response.data.map(({ name }) => {
            areaOptions.insertAdjacentHTML("beforeend", `<option value="${name}">${name}</option>`)
          })
         
          new SlimSelect({
            select: '.js-area',
        settings: {
                showSearch: false,
                placeholderText: 'Region',
  },
    })
  })
  .catch(function (error) {
  
    console.log(error);
  })
}

// Запрс и отрисовка ингридиентов

async function getIngridients() {
       await axios.get(`${BASE_URL}/ingredients`)
  .then(function (response) {
          response.data.map(({ name }) => {
            productOptions.insertAdjacentHTML("beforeend", `<option value="${name}">${name}</option>`)
          })
         
          new SlimSelect({
            select: '.js-product',
        settings: {
                showSearch: false,
                placeholderText: 'Product',
  },
        })
  })
  .catch(function (error) {
  
    console.log(error);
  }) 
}

getRequestAllRecipes();
createTimeOptions();
getRegions();
getIngridients();