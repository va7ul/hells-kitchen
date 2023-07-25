const refs = {
  openButtonEl: document.querySelector('.shopping-link'),
  closeButtonEl: document.querySelector('.order-now-modal__close-btn'),
  backdropEl: document.querySelector('.js-backdrop'),
  heroButtonEl: document.querySelector('.hero-btn'),
};

refs.heroButtonEl.addEventListener('click', onModalOpen);

refs.openButtonEl.addEventListener('click', onModalOpen);

refs.closeButtonEl.addEventListener('click', onModalRemove);

refs.backdropEl.addEventListener('click', onBackdropClick);

function onModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-order-now');
}

function onModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-order-now');
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
