var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=r),r("bUb57"),r("1gCDW");var a=r("c5nH8"),i=(a=r("c5nH8"),r("8WEGn")),c=r("7rYDH");const n=document.querySelector(".favorite-recipes-list"),s=document.querySelector(".hero-section-favorites"),l=document.querySelector(".favorite-filter"),d=document.querySelector(".tui-pagination"),f=document.querySelector(".empty-storage-wrapper");var u;const v=null!==(u=JSON.parse(localStorage.getItem("favorite")))&&void 0!==u?u:[];if(0!==v.length){(0,a.createCardTemplate)(v,n);document.querySelectorAll(".js-add-to-fav").forEach((e=>e.checked=!0))}else s.classList.add("hero-is-hidden"),l.classList.add("hiddenvisualy"),d.classList.add("hiddenvisualy"),f.classList.remove("hiddenvisualy");n.addEventListener("click",(function(e){if(e.target.classList.contains("card-template-btn")){const t=function(e){const t=e.closest(".card-template").dataset.id;return v.find((({_id:e})=>e===t))}(e.target);(0,i.popUpFunction)(t)}e.target.classList.contains("js-add-to-fav")&&((0,c.removeFromFavorites)("favorite",e.target,v),e.target.closest(".card-template").remove())}));const m=document.querySelector(".favorite-filter-list"),g=document.querySelector(".favorite-recipes-list"),p=document.querySelector(".all-category");var y;let S=null!==(y=JSON.parse(localStorage.getItem("favorite")))&&void 0!==y?y:[],L=0,h=0;const b=S.flatMap((e=>e.category)).filter(((e,t,o)=>o.indexOf(e)===t));b.sort(((e,t)=>e.localeCompare(t))),function(e){const t=e.map((e=>`<li class="favorite-filter-item" data-category="${e}">\n             <button type="button" class="favorite-filter-btn">\n            ${e}\n             </button>\n            </li>`)).join("");m.insertAdjacentHTML("beforeend",t)}(b),m.addEventListener("click",(function(e){if(e.target.classList.contains("favorite-filter-btn")){if(p.classList.remove("favorite-active-btn"),0!=h&&(p.classList.remove("in-focus"),h=0),0!=L){document.querySelector(".in-focus").classList.remove("in-focus"),L=0}const t=function(e){const t=JSON.parse(localStorage.getItem("favorite")),o=e.closest(".favorite-filter-item").dataset.category;if("all"===o)return p.classList.add("in-focus"),h+=1,t;return t.filter((({category:e})=>e===o))}(e.target);(0,a.createCardTemplate)(t,g);document.querySelectorAll(".js-add-to-fav").forEach((e=>e.checked=!0))}})),g.addEventListener("click",(function(e){if(e.target.classList.contains("js-add-to-fav")){const t=e.target.closest(".card-template").dataset.id,o=S.find((({_id:e})=>e===t));if(S=JSON.parse(localStorage.getItem("favorite")),S.some((e=>e.category===o.category))){const e=document.querySelector(`li[data-category="${o.category}"]`);return console.log(e),void(p.classList.contains("in-focus")||(e.firstElementChild.classList.add("in-focus"),L+=1))}document.querySelector(`li[data-category="${o.category}"]`).remove(),L=0,0===S.length&&p.remove()}})),r("hDduH"),r("bmAoy"),r("6jlVF"),r("8WEGn"),r("3pS2V"),r("7rYDH"),r("7sOwA");
//# sourceMappingURL=favorites.05f5a14b.js.map