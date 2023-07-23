import SlimSelect from "slim-select";
import debounce from "lodash.debounce";
import { getAreas, getIngredients, save, getRecipes } from "./api";

let userInput = "";

const inputSearch = document.querySelector(".js-input-home")
const inputForm = document.querySelector(".js-form-home")
const timeOptions = document.querySelector(".js-time")
const areaOptions = document.querySelector(".js-area")
const productOptions = document.querySelector(".js-product")

inputForm.addEventListener("submit", function (evt) { evt.preventDefault()});
inputSearch.addEventListener("input", debounce(onInputSearch, 300));
timeOptions.addEventListener("change", onTimeOptions)
areaOptions.addEventListener("change", onAreaOptions)
productOptions.addEventListener("change", onProductOptions)

function onInputSearch(evt) {
           
        userInput = evt.target.value.trim();
        if (userInput === "") {
            return 
        }
        save("title", `${userInput}`);
}

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

createTimeOptions();


getAreas()
        .then(areas => {
                areas.map(({ name }) => {
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
        
        .catch(error => console.log(error))



getIngredients()
        .then(ingridients => {
                ingridients.map(({ name }) => {
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
        .catch(error => console.log(error))


function onTimeOptions(evt) {
        const time = evt.currentTarget.value;
        save("time", `${time}`);
}

function onAreaOptions(evt) {
        const area = evt.currentTarget.value;
        save("area", `${area}`);
}



function onProductOptions(evt) {
        const ingredients = evt.currentTarget.value;
        save("ingredients", `${ingredients}`);
}
