!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var o=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,o.call(a.exports,a,a.exports),a.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){r[e]=t},e.parcelRequired7c6=o),o("i8Q71"),o("4Qm2O"),o("b7ONl");var a,n=o("boQj9"),i=(n=o("boQj9"),o("QPNXd")),c=o("b7ONl"),l="favorite",d=document.querySelector(".favorite-recipes-list"),s=document.querySelector(".hero-section-favorites"),u=document.querySelector(".favorite-filter"),f=document.querySelector(".tui-pagination"),v=document.querySelector(".empty-storage-wrapper"),p=null!==(a=JSON.parse(localStorage.getItem(l)))&&void 0!==a?a:[];(console.log("dddd"),0!==p.length)?((0,n.createCardTemplate)(p,d),document.querySelectorAll(".js-add-to-fav").forEach((function(e){return e.checked=!0}))):(s.classList.add("hero-is-hidden"),u.classList.add("hiddenvisualy"),f.classList.add("hiddenvisualy"),v.classList.remove("hiddenvisualy"));d.addEventListener("click",(function(e){if(e.target.classList.contains("card-template-btn")){var t=(r=e.target,o=r.closest(".card-template").dataset.id,p.find((function(e){return e._id===o})));(0,i.popUpFunction)(t)}var r,o;e.target.classList.contains("js-add-to-fav")&&((0,c.removeFromFavorites)(e.target,p),e.target.closest(".card-template").remove())}));var g,m=document.querySelector(".favorite-filter-list"),y=document.querySelector(".favorite-recipes-list"),b=null!==(g=JSON.parse(localStorage.getItem(l)))&&void 0!==g?g:[];function S(){var e=b.flatMap((function(e){return e.category})).filter((function(e,t,r){return r.indexOf(e)===t})).map((function(e){return'<li class="favorite-filter-item" data-category="'.concat(e,'">\n             <button type="button" class="favorite-filter-btn">\n            ').concat(e,"\n             </button>\n            </li>")})).join("");m.insertAdjacentHTML("beforeend",e)}S(),m.addEventListener("click",(function(e){if(e.target.classList.contains("favorite-filter-btn")){var t=(r=e.target,o=JSON.parse(localStorage.getItem(l)),(a=r.closest(".favorite-filter-item").dataset.category)?o.filter((function(e){return e.category===a})):o);console.log(t),(0,n.createCardTemplate)(t,y),document.querySelectorAll(".js-add-to-fav").forEach((function(e){return e.checked=!0})),S()}var r,o,a})),o("OtYKr"),o("dEcaA"),o("fz8By"),o("QPNXd"),o("lubkt"),o("b7ONl"),o("bfaTO")}();
//# sourceMappingURL=favorites.e3b3c11c.js.map