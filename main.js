(()=>{"use strict";var e=function(e,t,n,r,o){var c=o.content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),p=c.querySelector(".card__delete-button"),i=c.querySelector(".card__title"),u=c.querySelector(".card__like-button");return a.src=e.link,a.alt="Фотография ".concat(e.name),i.textContent=e.name,p.addEventListener("click",(function(){return t(c)})),u.addEventListener("click",n),a.addEventListener("click",(function(){return r(e.name,e.link)})),c},t=function(e){e.remove()},n=function(e){e.target.classList.toggle("card__like-button_is-active")},r=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a),e.addEventListener("click",c)},o=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),e.removeEventListener("click",c)},c=function(e){e.target===e.currentTarget&&o(e.target.closest(".popup"))},a=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&o(t)}},p=document.querySelector(".places__list"),i=document.querySelector("#card-template"),u=document.querySelector(".popup_type_edit"),l=document.querySelector(".profile__edit-button"),s=u.querySelector(".popup__close"),d=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),v=document.forms["edit-profile"],_=v.elements.name,f=v.elements.description;l.addEventListener("click",(function(){_.value=d.textContent,f.value=m.textContent,r(u)})),v.addEventListener("submit",(function(e){e.preventDefault();var t=_.value,n=f.value;d.textContent=t,m.textContent=n,o(e.target.closest(".popup"))})),s.addEventListener("click",(function(){return o(u)}));var y=document.querySelector(".popup_type_new-card"),k=document.querySelector(".profile__add-button"),q=y.querySelector(".popup__close"),S=document.forms["new-place"],g=S.elements["place-name"],L=S.elements.link;k.addEventListener("click",(function(){return r(y)})),S.addEventListener("submit",(function(r){r.preventDefault();var c={name:g.value,link:L.value},a=e(c,t,n,j,i);p.prepend(a),o(r.target.closest(".popup")),S.reset()})),q.addEventListener("click",(function(){return o(y)}));var E=document.querySelector(".popup_type_image"),h=E.querySelector(".popup__image"),b=E.querySelector(".popup__caption"),x=E.querySelector(".popup__close"),j=function(e,t){h.src=t,h.alt="Фотография ".concat(e),b.textContent=e,r(E)};x.addEventListener("click",(function(){return o(E)})),[{name:"Хабаровск",link:"https://wikiway.com/upload/hl-photo/c07/58f/khabarovsk_105.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e(r,t,n,j,i);p.append(o)}))})();