const paginationEl = document.getElementById('pagination');
const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;

let currentPage = 1;
let itemsPerPage = 0;
let visiblePages = 0;

function setPagination(arr=undefined) {
  if (mainElementWidth < 768) {
    console.log('mainElementWidth', mainElementWidth);
    itemsPerPage = 3;
    visiblePages = 2;
    if (arr.length <= itemsPerPage) {
      paginationEl.classList.add('hiddenvisualy');
    }
    if (arr.length > itemsPerPage) {
      paginationEl.classList.remove('hiddenvisualy');
    }
  } else if (mainElementWidth >= 768) {
    console.log('mainElementWidth', mainElementWidth);
    itemsPerPage = 2;
    visiblePages = 3;
    if (arr.length <= itemsPerPage) {
      paginationEl.classList.add('hiddenvisualy');
    }
    if (arr.length > itemsPerPage) {
      paginationEl.classList.remove('hiddenvisualy');
    }
  }
}

function calculationOfVisibleElements(arr) {
let start = itemsPerPage * currentPage - itemsPerPage;
let end = start + itemsPerPage;
let partOfArr = arr.slice(start, end); 
}

// let paginationFilter = new Pagination('pagination',

function printPagination(arr) {
    const paginationMain = {
      totalItems: arr.length,
      itemsPerPage: itemsPerPage,
      visiblePages: visiblePages,
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
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"></a>',
      },
    };
    return paginationMain;
}

// paginationFilter.on('afterMove',
    
function movePage (eventData) {
  currentPage = eventData.page;
  start = itemsPerPage * currentPage - itemsPerPage;
  end = start + itemsPerPage;
  partOfArr = findProduct.slice(start, end);
  createCardTemplate(partOfArr, favoriteRecipesListEl);
  const checkHeartEl = document.querySelectorAll('.js-add-to-fav');
  checkHeartEl.forEach(item => (item.checked = true));
};
