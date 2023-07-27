import SlimSelect from "slim-select";
import debounce from "lodash.debounce";
import { getAreas, getIngredients, resetFilters } from "./api";
import { fetchRecipes } from "./all_recipes";
import { Loading } from "notiflix";

let userInput = "";
let i = 0;
let timeSelect;
let areaSelect;
let productSelect;

const inputSearch = document.querySelector(".js-input-home");
const inputForm = document.querySelector(".js-form-home");
const timeOptions = document.querySelector(".js-time");
const areaOptions = document.querySelector(".js-area");
const productOptions = document.querySelector(".js-product");
const resetBtn = document.querySelector(".js-reset-filter");

inputForm.addEventListener("submit", function (evt) { evt.preventDefault()});
inputSearch.addEventListener("input", debounce(onInputSearch, 300));
timeOptions.addEventListener("change", onTimeOptions);
areaOptions.addEventListener("change", onAreaOptions);
productOptions.addEventListener("change", onProductOptions);
resetBtn.addEventListener("click", onResetBtn);

function onResetBtn() {
        resetSelectsToDefault();
        resetFilters();
        fetchRecipes();
}

function resetSelectsToDefault() {
        inputSearch.value = "";
        timeSelect.setSelected(timeSelect.getData()[0]);
        areaSelect.setSelected(areaSelect.getData()[0]);
        productSelect.setSelected(productSelect.getData()[0]);
}

function onInputSearch(evt) {
           
        userInput = evt.target.value.trim();
        if (userInput === "") {
                localStorage.setItem('title', '');
            return 
        }
        localStorage.setItem('title', userInput);
        fetchRecipes();
}

function createTimeOptions() {

        for ( i = 5; i <= 120; i += 5){
                const option = `<option value="${i}">${i} min</option>`
            timeOptions.insertAdjacentHTML("beforeend", option)  
        }
        timeSelect = new SlimSelect({
            select: '.js-time',
         settings: {
                 showSearch: false,
                 openPosition: 'down',
                placeholderText: '0 min',
  },
     })
}

createTimeOptions();


getAreas()
        .then(areas => {
                areas.map(({ name }) => {
                        areaOptions.insertAdjacentHTML("beforeend", `<option value="${name}">${name}</option>`)
                })
                areaSelect = new SlimSelect({
            select: '.js-area',
        settings: {
                showSearch: true,
                openPosition: 'down',
                placeholderText: 'Region',
  },
    })
  })
        
        .catch(error => console.log(error))



getIngredients()
        .then(ingridients => {
                ingridients.map(({ name, _id }) => {
                        productOptions.insertAdjacentHTML("beforeend", `<option data-ing="${_id}" value="${name}">${name}</option>`)
                        
                })
                productSelect = new SlimSelect({
            select: '.js-product',
        settings: {
                showSearch: true,
                openPosition: 'down',
                placeholderText: 'Product',
  },
                })
                
        })
        .catch(error => console.log(error))
        .finally(() => {
                Loading.remove()
                localStorage.setItem('loading', 1);
        })
        

function onTimeOptions(evt) {
        if (evt.currentTarget.value === timeSelect.getData()[0].value) {
          return;
        }
        const time = evt.currentTarget.value;
        localStorage.setItem('time', time);
        fetchRecipes();
}

function onAreaOptions(evt) {
        if (evt.currentTarget.value === areaSelect.getData()[0].value) {
          return;
        }
        const area = evt.currentTarget.value;
        localStorage.setItem('area', area);
        fetchRecipes();
}

function onProductOptions(evt) {
        if (evt.currentTarget.value === productSelect.getData()[0].value) {
          return;
        }
        const ingredient = evt.target.options[evt.target.selectedIndex].dataset.ing;
        localStorage.setItem('ingredient', ingredient);
        fetchRecipes();
}

export { resetSelectsToDefault }