import { patchRating } from '../api';

const refs = {
  starsEl: document.querySelector('.live-rating'),
  submitBtnEl: document.querySelector('.rating-modal-form-btn'),
  inputEl: document.querySelector('.rating-modal-form-input'),
  openButtonEl: document.querySelector('.rating-modal-btn-open'),
  closeButtonEl: document.querySelector('.rating-modal-btn-close'),
  backdropEl: document.querySelector('.js-backdrop'),
};

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

refs.submitBtnEl.addEventListener('click', submitRating);

function submitRating(evt) {
  evt.preventDefault();
  let giveRating = Number(refs.starsEl.textContent);
  let email = refs.inputEl.value;
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

refs.openButtonEl.addEventListener('click', onRatingModalOpen);
refs.closeButtonEl.addEventListener('click', onRatingModalRemove);
refs.backdropEl.addEventListener('click', onRatingBackdropClick);

function onRatingModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-rating');
}

function onRatingModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-rating');
}

function onRatingBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onRatingModalRemove();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onRatingModalRemove();
  }
}
export { onRatingModalOpen };
