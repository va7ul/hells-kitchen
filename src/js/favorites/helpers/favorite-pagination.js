import { createCardTemplate } from '../../card_template';
import { checkHeart } from './check-heart';

export function setPagination(elementWidth, element, arr = undefined) {
  let itemsPerPage = 0;
  let visiblePages = 0;
  if (elementWidth < 768) {
    console.log('elementWidth', elementWidth);
    itemsPerPage = 3;
    visiblePages = 2;
    if (arr?.length <= itemsPerPage) {
      element.classList.add('hiddenvisualy');
    }
    if (arr?.length > itemsPerPage) {
      element.classList.remove('hiddenvisualy');
    }
  } else if (elementWidth >= 768) {
    itemsPerPage = 2;
    visiblePages = 3;
    if (arr?.length <= itemsPerPage) {
      element.classList.add('hiddenvisualy');
    }
    if (arr?.length > itemsPerPage) {
      element.classList.remove('hiddenvisualy');
    }
  }
  return (paginationSettings = { itemsPerPage, visiblePages });
}

export function calculationOfVisibleElements(itemsPerPage, currentPage, arr) {
  let start = itemsPerPage * currentPage - itemsPerPage;
  let end = start + itemsPerPage;
  let partOfArr = arr.slice(start, end);
  return partOfArr;
}

export function printPagination(arr, itemsPerPage, visiblePages) {
  const paginationMain = {
    totalItems: arr?.length,
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
      moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"></a>',
    },
  };
  return paginationMain;
}

export function movePage(
  eventData,
  arr,
  itemsPerPage,
  currentPage,
  elementList,
  elementFilter = undefined,
  focusOnBtn
) {
  currentPage = eventData.page;
  let partOfArr = calculationOfVisibleElements(itemsPerPage, currentPage, arr);
  if (elementFilter) {
    elementFilter.firstElementChild.classList.add('in-focus');
    focusOnBtn[0] += 1;
    console.log('intoPag', focusOnBtn);
  }
  createCardTemplate(partOfArr, elementList);
  checkHeart();
}
