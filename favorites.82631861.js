var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var o=r[e];delete r[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequired7c6=o),o("bUb57"),o("1gCDW");var n=o("7rYDH"),i=o("c5nH8"),a=o("4DKoY");const l=document.querySelector(".favorite-filter-list"),c=document.querySelector(".favorite-recipes-list");var s;s=JSON.parse(localStorage.getItem(a.KEY_FAVORITE));(0,n.getAllCategories)().then((e=>{if(0===e.length)throw new Error;const t=e.map((({name:e})=>`<li class="favorite-filter-item" data-category="${e}">\n             <button type="button" class="favorite-filter-btn">\n            ${e}\n             </button>\n            </li>`)).join("");l.insertAdjacentHTML("beforeend",t)})).catch((e=>Notify.failure("Oops! Something went wrong!"))),l.addEventListener("click",(function(e){if(e.target.classList.contains("favorite-filter-btn")){const t=function(e){const t=JSON.parse(localStorage.getItem(a.KEY_FAVORITE)),r=e.closest(".favorite-filter-item").dataset.category;return r?t.filter((({category:e})=>e===r)):t}(e.target);console.log(t),(0,i.createCardTemplate)(t,c)}})),o("4DKoY"),o("hDduH"),o("bmAoy"),o("6jlVF"),o("8WEGn"),o("3pS2V"),o("7rYDH"),o("7sOwA");
//# sourceMappingURL=favorites.82631861.js.map