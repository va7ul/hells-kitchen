export function checkHeart() {
  const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
  checkHeartEl.forEach(item => (item.checked = true));
}
