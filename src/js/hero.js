const { default: axios } = require('axios');
let $ = require('jquery');

function sliderStart() {
  $(document).ready(function () {
    $('.slider').slick({
      variableWidth: true,
      arrows: false,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 5000,
    });
  });
}

const slider = document.querySelector('.slider');

async function fetchEvents() {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/events'
    );
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

function renderSlider(response) {
  const markup = response
    .map(event => {
      return `      
<div class="slider-item-cook" >
<img src="${event.cook.imgUrl}" loading="lazy" alt="${event.cook.name}">
</div>

<div class="slider-item-topic bcg">
  <img src="${event.topic.imgUrl}" loading="lazy" alt="${event.topic.name}">
  <p class="description">${event.topic.name}</p>
  <p class="country">${event.topic.area}</p>
</div>

<div class="slider-item-finally">
  <img src="${event.topic.imgUrl}" loading="lazy" alt="${event.topic.name}">
</div>`;
    })
    .join('');

  slider.insertAdjacentHTML('beforeend', markup);
}

async function start() {
  const data = await fetchEvents();
  sliderStart();
  renderSlider(data);
}

start();
