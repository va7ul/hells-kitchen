import { patchRating } from '../api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const refs = {
  starsEl: document.querySelector('.live-rating'),
  submitBtnEl: document.querySelector('.rating-modal-form-btn'),
  inputEl: document.querySelector('.rating-modal-form-input'),
  openButtonEl: document.querySelector('.rating-modal-btn-open'),
  closeButtonEl: document.querySelector('.rating-modal-btn-close'),
  backdropEl: document.querySelector('.js-backdrop'),
  test: document.querySelector('.my-rating-9'),
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

refs.openButtonEl.addEventListener('click', onRatingModalOpen);
refs.closeButtonEl.addEventListener('click', onRatingModalRemove);
refs.backdropEl.addEventListener('click', onRatingBackdropClick);
refs.submitBtnEl.addEventListener('click', submitRating);

function submitRating(evt) {
  evt.preventDefault();
  let giveRating = Number(refs.starsEl.textContent);
  let email = refs.inputEl.value;
  // треба підключити ID з картки
  let recipeId = '6462a8f74c3d0ddd288980d4';
  const options = {
    rate: giveRating,
    email,
  };

  patchRating(recipeId, options)
    .then(categories => {
      // console.log(categories);
      if (localStorage.getItem('patch-rating') === 'error') {
        return Notify.failure('Oops! Something went wrong!');
      }
      onRatingModalRemove();
      refs.starsEl.textContent = '0.0';
      refs.inputEl.value = '';
      Notify.success('Thank you for your feedback!');
    })
    .catch(error => console.log(error))
    .finally(() => Loading.remove());
}

function onRatingModalOpen() {
  disablePageScroll();
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-rating');
  if (document.body.classList.contains('show-modal-rating')) {
    window.addEventListener('click', onClickWin);
  }
}

function onClickWin(event) {
  if (!event.target.classList.contains('js-backdrop')) {
    return;
  }
  onRatingModalRemove();
  window.removeEventListener('click', onClickWin);
}

function onRatingModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-rating');
  enablePageScroll();
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
