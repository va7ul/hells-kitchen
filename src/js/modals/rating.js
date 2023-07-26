import { patchRating } from '../api';

const starsEl = document.querySelector('.live-rating');
const submitBtnEl = document.querySelector('.rating-modal-form-btn');
const inputEl = document.querySelector('.rating-modal-form-input');

$('.my-rating-9').starRating({
  initialRating: 0.0,
  disableAfterRate: true,

  starSize: 24,
  onHover: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentIndex);
  },
  onLeave: function (currentIndex, currentRating, $el) {
    $('.live-rating').text(currentRating);
  },
});

submitBtnEl.addEventListener('click', submitRating);

function submitRating(evt) {
  evt.preventDefault();
  let giveRating = Number(starsEl.textContent);
  let email = inputEl.value;
  // треба підключити ID з картки
  let recipeId = '6462a8f74c3d0ddd288980d4';
  console.dir(giveRating);
  console.dir(email);

  const options = {
    rate: giveRating,
    email,
  };

  patchRating(recipeId, options)
    .then(categories => console.log(categories))
    .catch(error => console.log(error));
}

const refs = {
  openButtonEl: document.querySelector('.rating-modal-btn-open'),
  closeButtonEl: document.querySelector('.rating-modal-btn-close'),
  backdropEl: document.querySelector('.js-backdrop'),
};

refs.openButtonEl.addEventListener('click', onRatingModalOpen);

refs.closeButtonEl.addEventListener('click', onModalRemove);

refs.backdropEl.addEventListener('click', onBackdropClick);

function onRatingModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-rating');
}

function onModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-rating');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onModalRemove();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onModalRemove();
  }
}
export { onRatingModalOpen };
