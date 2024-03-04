(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{qq:()=>J,$z:()=>z,Il:()=>N,Mp:()=>W,vi:()=>I});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-7",headers:{authorization:"61fe5dc4-81a4-42d7-b6c1-02a3a0f89cbb","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():Promise.reject("Упс: ".concat(e.status))},r=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a),e.addEventListener("click",c)},o=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),e.removeEventListener("click",c),e.querySelectorAll("input").forEach((function(e){e.value=""}))},c=function(e){e.target===e.currentTarget&&o(e.target.closest(".popup"))},a=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&o(t)}},i={cardDeletFn:function(e,r){W((function(){var c;(c=e,fetch("".concat(t.baseUrl,"/cards/").concat(c),{method:"DELETE",headers:t.headers}).then((function(e){return n(e)}))).then((function(){r.remove(),o(z)})).catch((function(e){return console.log(e)}))}))},cardLikeFn:function(e,r,o){var c;r.classList.contains("card__like-button_is-active")?(c=e,fetch("".concat(t.baseUrl,"/cards/likes/").concat(c),{method:"DELETE",headers:t.headers}).then((function(e){return n(e)}))).then((function(e){r.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return n(e)}))}(e).then((function(e){r.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.log(e)}))},cardClickFn:function(e,t){N.src=t,N.alt="Фотография ".concat(e),J.textContent=e,r(I)}},u=function(e,t,n,r){var o=r.content.querySelector(".places__item").cloneNode(!0),c=o.querySelector(".card__image"),a=o.querySelector(".card__delete-button"),i=o.querySelector(".card__title"),u=o.querySelector(".card__like-button"),l=o.querySelector(".card__like-counter");return c.src=t.link,c.alt="Фотография ".concat(t.name),i.textContent=t.name,l.textContent=t.likes.length,e!==t.owner._id&&a.remove(),t.likes.some((function(t){return t._id===e}))&&u.classList.add("card__like-button_is-active"),a.addEventListener("click",(function(){return n.cardDeletFn(t._id,o)})),u.addEventListener("click",(function(){return n.cardLikeFn(t._id,u,l)})),c.addEventListener("click",(function(){return n.cardClickFn(t.name,t.link)})),o},l=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),s(n,r,t)};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p,m=document.querySelector(".places__list"),v=document.querySelector("#card-template"),y=function(e){e.target.querySelector(b.submitButtonSelector).textContent="Сохранение..."},_=function(e){e.target.querySelector(b.submitButtonSelector).textContent="Сохранить"},h=function(e){E.textContent=e.name,g.textContent=e.about,p=e._id},S=function(e){w.style.backgroundImage="url(".concat(e.avatar,")")},b={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},k=document.querySelector(".popup_type_edit"),q=document.querySelector(".profile__edit-button"),L=k.querySelector(".popup__close"),E=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),C=document.forms["edit-profile"],x=C.elements.name,A=C.elements.description;q.addEventListener("click",(function(){x.value=E.textContent,A.value=g.textContent,d(C,b),r(k)})),C.addEventListener("submit",(function(e){var r,c;e.preventDefault(),y(e),(r=x.value,c=A.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:c})}).then((function(e){return n(e)}))).then((function(e){h(e),o(k)})).catch((function(e){return console.log(e)})).finally((function(){return _(e)}))})),L.addEventListener("click",(function(){return o(k)}));var w=document.querySelector(".profile__image"),U=document.querySelector(".popup_type_avatar"),O=U.querySelector(".popup__close"),j=document.forms.avatar,T=j.elements["avatar-link"];w.addEventListener("click",(function(){d(j,b),r(U)})),j.addEventListener("submit",(function(e){var r;e.preventDefault(),y(e),(r=T.value,new Promise((function(e,t){var n=new XMLHttpRequest;n.open("HEAD","https://corsproxy.io/?"+r,!0),n.onload=function(){200===n.status&&n.getResponseHeader("Content-Type").startsWith("image/")?e(!0):t(!1)},n.onerror=t,n.send()}))).then((function(){var r;(r=T.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then((function(e){return n(e)}))).then((function(e){S(e),o(U),j.reset()})).catch((function(e){return console.log(e)})).finally((function(){return _(e)}))})).catch((function(){var t=j.querySelector("".concat(b.inputSelector,"-error"));t.textContent="Данный URL не ведёт к изображению.",t.classList.add(b.errorClass),_(e)}))})),O.addEventListener("click",(function(){o(U),j.reset()}));var P=document.querySelector(".popup_type_new-card"),B=document.querySelector(".profile__add-button"),D=P.querySelector(".popup__close"),F=document.forms["new-place"],M=F.elements["place-name"],H=F.elements.link;B.addEventListener("click",(function(){d(F,b),r(P)})),F.addEventListener("submit",(function(e){var r;e.preventDefault(),y(e),(r={name:M.value,link:H.value},fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r.name,link:r.link})}).then((function(e){return n(e)}))).then((function(e){var t=u(p,e,i,v);m.prepend(t),o(P),F.reset()})).catch((function(e){return console.log(e)})).finally((function(){return _(e)}))})),D.addEventListener("click",(function(){o(P),F.reset()}));var I=document.querySelector(".popup_type_image"),N=I.querySelector(".popup__image"),J=I.querySelector(".popup__caption");I.querySelector(".popup__close").addEventListener("click",(function(){return o(I)}));var R,z=document.querySelector(".popup_type_confirmation_delete"),V=z.querySelector(".popup__button"),$=z.querySelector(".popup__close"),W=function(e){V.onclick=e,r(z)};$.addEventListener("click",(function(){return o(z)})),R=b,Array.from(document.querySelectorAll(R.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(e,R)})),Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return n(e)})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return n(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];h(o),S(o),c.forEach((function(e){var t=u(p,e,i,v);m.append(t)}))})).catch((function(e){console.error(e)}))})();