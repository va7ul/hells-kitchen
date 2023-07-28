import { postOrder } from '../api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const refs = {
  modalOrderNowForm: document.querySelector('.order-now-modal-form'),
  openButtonEl: document.querySelector('.shopping-cart'),
  openButtonHeroEl: document.querySelector('.hero-btn'),
  closeButtonEl: document.querySelector('.order-now-modal__close-btn'),
  backdropEl: document.querySelector('.js-backdrop'),
};

if (refs.openButtonHeroEl) {
  refs.openButtonHeroEl.addEventListener('click', onModalOpen);
}

refs.openButtonEl.addEventListener('click', onModalOpen);

refs.closeButtonEl.addEventListener('click', onModalRemove);

refs.backdropEl.addEventListener('click', onBackdropClick);

refs.modalOrderNowForm.addEventListener('submit', onSubmitForm);

function onModalOpen() {
  disablePageScroll();
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-order-now');
}

function onModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-order-now');
  enablePageScroll();
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

function extractFormData(form) {
  let formData = {};

  formData.name = form.querySelector('input[name="name"]').value;
  formData.phone = form.querySelector('input[name="phone"]').value;
  formData.email = form.querySelector('input[name="email"]').value;
  formData.comment = form.querySelector('textarea[name="comment"]').value;
  if (form.querySelector('textarea[name="comment"]').value === '') {
    formData.comment = 'So delicious';
  }
  return formData;
}

function onSubmitForm(e) {
  e.preventDefault();

  const formData = extractFormData(refs.modalOrderNowForm);

  const { name, phone, email, comment } = formData;

  const options = {
    name,
    phone,
    email,
    comment,
  };

  postOrder(options)
    .then(() => {
      if (localStorage.getItem('patch-rating') !== 'error') {
        onModalRemove();
        setTimeout(() => {
          Notify.success('Thank you for your order!');
        }, 500);
        refs.modalOrderNowForm.reset();
      }
      return;
    })
    .catch(error => console.log(error))
    .finally(
      setTimeout(() => {
        Loading.remove();
      }, 500)
    );
}
export { onModalOpen };
