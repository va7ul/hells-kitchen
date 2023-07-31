import Pagination from 'tui-pagination';
import { getTotalItems } from './api';
import { fetchRecipesForPagination } from './all_recipes';
import { dataRecipes } from './all_recipes';


let response = [];
let pagination;
const totalItems =
  localStorage.getItem('totalPages') * localStorage.getItem('limit');
let visiblePages = 2;

if (window.innerWidth < 1280) {
  visiblePages = 2;
} else {
  visiblePages = 3;
}

async function createPagination() {
  
  const arr = await getTotalItems();
 

  const container = document.getElementById('tui-pagination');
  
  const options = {
    totalItems: arr[0],
    itemsPerPage: arr[1],
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

   pagination = new Pagination(container, options)
  
   pagination.on('beforeMove', async (event) => {
      const currentPage = event.page;
      localStorage.setItem('page', currentPage)
     try {
       dataRecipes = await fetchRecipesForPagination()
    
      } catch (error) {
        console.error('Ошибка при получении данных о рецептах:', error);
      }});

}

createPagination();

export { pagination, createPagination };
