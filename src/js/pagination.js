import Pagination from 'tui-pagination';

const totalItems =
  localStorage.getItem('totalPages') * localStorage.getItem('limit');
let visiblePages = 2;

if (window.innerWidth < 1280) {
  visiblePages = 2;
} else {
  visiblePages = 3;
}

const container = document.getElementById('tui-pagination');
const options = {
  totalItems: totalItems,
  itemsPerPage: 9,
  visiblePages: 3,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"></a>',
  },
};
const pagination = new Pagination(container, options);

export { pagination };
