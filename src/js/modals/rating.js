import { patchRating } from '../api';

const starsEl = document.querySelector('.live-rating');
const submitBtnEl = document.querySelector('.rating-modal-form-btn');
const closeBtnEl = document.querySelector('.rating-modal-btn-close');

$('.my-rating-9').starRating({
  initialRating: 0.0,
  disableAfterRate: false,

  starSize: 24,
  onHover: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentIndex);
  },
  onLeave: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentRating);
  },
});


submitBtnEl.addEventListener('click', submitRating());

async function submitRating() {
  let giveRating = starsEl.text;
  console.log(giveRating);

  //   await patchRating('6462a6cd4c3d0ddd28897f8e', giveRating)
  //     .then(categories => console.log(categories))
  //     .catch(error => console.log(error));
}
