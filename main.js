(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o){var i=this,a=o.handleCardClick,c=o.handleDeleteClick,u=o.handleLikeClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._id=e._id,this._owner=e.owner,this._likes=e.likes,this._user=r,this._cardSelector=n,this._handleCardClick=a,this._handleDeleteClick=c,this._handleLikeClick=u,this._userLiked=e.likes.some((function(e){return e._id===i._user._id}))}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_initLike",value:function(){this._userLiked&&this._cardLikeElement.classList.add("card__like_active")}},{key:"toggleLike",value:function(e){this._cardCountElement.textContent=e.length,this._cardLikeElement.classList.toggle("card__like_active"),this._userLiked=!this._userLiked}},{key:"_initTrash",value:function(){this._user._id!==this._owner._id&&this._cardDeleteElement.classList.add("card__delete_hidden")}},{key:"deleteCard",value:function(){this._cardElement.remove(),this._cardElement=null}},{key:"_setEventListeners",value:function(){var e=this;this._cardLikeElement.addEventListener("click",(function(){e._handleLikeClick()})),this._cardImageElement.addEventListener("click",(function(){e._handleCardClick()})),this._cardDeleteElement.addEventListener("click",(function(){e._handleDeleteClick(e)}))}},{key:"createCardElement",value:function(){return this._cardElement=this._getTemplate(),this._cardImageElement=this._cardElement.querySelector(".card__image"),this._cardNameElement=this._cardElement.querySelector(".card__title"),this._cardLikeElement=this._cardElement.querySelector(".card__like"),this._cardCountElement=this._cardElement.querySelector(".card__count"),this._cardDeleteElement=this._cardElement.querySelector(".card__delete"),this._cardNameElement.textContent=this._name,this._cardImageElement.src=this._link,this._cardImageElement.alt="фотография "+this._name,this._cardCountElement.textContent=this._likes.length,this._initTrash(),this._initLike(),this._setEventListeners(),this._cardElement}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputList=Array.from(n.querySelectorAll(t.inputSelector)),this._saveButton=n.querySelector(t.submitButtonSelector),this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._validateForm=n}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){this._checkFormValidity()}},{key:"_checkFormValidity",value:function(){var e=this;this._inputList.forEach((function(t){var n={input:t,errorSpan:e._validateForm.querySelector(".".concat(t.id,"-error"))};t.addEventListener("input",(function(){e._checkInputValidity(n),e._toggleSaveButtonState()}))}))}},{key:"_checkInputValidity",value:function(e){this._isInputValid(e)?this._hideInputError(e):this._showInputError(e)}},{key:"_toggleSaveButtonState",value:function(){this._hasInvalidInput()?this.deactivateSaveButton():this.activateSaveButton()}},{key:"activateSaveButton",value:function(){this._saveButton.classList.remove(this._inactiveButtonClass),this._saveButton.disabled=!1}},{key:"deactivateSaveButton",value:function(){this._saveButton.classList.add(this._inactiveButtonClass),this._saveButton.disabled=!0}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_isInputValid",value:function(e){return e.input.validity.valid}},{key:"_showInputError",value:function(e){e.input.classList.add(this._inputErrorClass),e.errorSpan.textContent=e.input.validationMessage}},{key:"_hideInputError",value:function(e){e.input.classList.remove(this._inputErrorClass),e.errorSpan.textContent=""}},{key:"hideErrors",value:function(){var e=this;this._inputList.forEach((function(t){var n={input:t,errorSpan:e._validateForm.querySelector(".".concat(t.id,"-error"))};e._hideInputError(n)}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(t),this._jobElement=document.querySelector(n),this._avatarElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,job:this._jobElement.textContent,avatar:this._avatarElement.src,_id:this._id}}},{key:"setUserInfo",value:function(e){this._nameElement.textContent=e.name,this._jobElement.textContent=e.about,this._id=e._id}},{key:"setUserAvatar",value:function(e){this._avatarElement.src=e.avatar}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popupElement.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscClose),this._popupElement.classList.remove("popup_opened")}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("click",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},s.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function p(e,t){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},p(e,t)}function h(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._formSubmitHandler=t,n._form=n._popupElement.querySelector(".form"),n._inputs=Array.from(n._form.querySelectorAll(".form__input")),n._originalSubmitText=n._popupElement.querySelector(".form__save-button").textContent,n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputs.forEach((function(t){return e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){var e=this;s(d(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._formSubmitHandler(e._getInputValues())}))}},{key:"close",value:function(){s(d(a.prototype),"close",this).call(this),this._form.reset()}},{key:"renderLoading",value:function(e){this._popupElement.querySelector(".form__save-button").textContent=e?"Сохранение...":this._originalSubmitText}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function E(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupCardImage=t._popupElement.querySelector(".card-scale__image"),t._popupCardCaption=t._popupElement.querySelector(".card-scale__caption"),t}return t=a,(n=[{key:"open",value:function(e){m(g(a.prototype),"open",this).call(this),this._popupCardImage.src=e._link,this._popupCardImage.alt="попап "+e._name,this._popupCardCaption.textContent=e._name}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=L(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},O.apply(this,arguments)}function L(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function P(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function I(e){return I=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},I(e)}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=I(r);if(o){var n=I(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return P(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._formSubmitHandler=t,n._form=n._popupElement.querySelector(".form"),n}return t=a,(n=[{key:"open",value:function(e){O(I(a.prototype),"open",this).call(this),this._card=e}},{key:"setEventListeners",value:function(){var e=this;O(I(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._formSubmitHandler(e._card)}))}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){e._renderer(t)}))}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._authorization=t.headers.authorization}var t,n;return t=e,(n=[{key:"_checkResult",value:function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}},{key:"getUserInfo",value:function(){var e=this;return fetch(this._baseUrl+"users/me",{method:"GET",headers:{authorization:this._authorization}}).then((function(t){return e._checkResult(t)}))}},{key:"getInitialCards",value:function(){var e=this;return fetch(this._baseUrl+"cards",{method:"GET",headers:{authorization:this._authorization}}).then((function(t){return e._checkResult(t)}))}},{key:"setUserInfo",value:function(e){var t=this;return fetch(this._baseUrl+"users/me",{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(e.name),about:"".concat(e.job)})}).then((function(e){return t._checkResult(e)}))}},{key:"addCard",value:function(e){var t=this;return fetch(this._baseUrl+"cards",{method:"POST",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(e.place),link:"".concat(e.url)})}).then((function(e){return t._checkResult(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch(this._baseUrl+"cards/"+e._id,{method:"DELETE",headers:{authorization:this._authorization,"Content-Type":"application/json"}}).then((function(e){return t._checkResult(e)}))}},{key:"toggleLikeCard",value:function(e){var t=this,n=e._userLiked?"DELETE":"PUT";return fetch(this._baseUrl+"cards/"+e._id+"/likes",{method:n,headers:{authorization:this._authorization,"Content-Type":"application/json"}}).then((function(e){return t._checkResult(e)}))}},{key:"setUserAvatar",value:function(e){var t=this;return fetch(this._baseUrl+"users/me/avatar",{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({avatar:"".concat(e.avatarurl)})}).then((function(e){return t._checkResult(e)}))}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),x=document.querySelector(".page"),z=x.querySelector(".form_profile_edit"),D=x.querySelector(".form_card_add"),V=x.querySelector(".form_avatar_edit"),A=x.querySelector(".profile__edit-button"),H=x.querySelector(".profile__add-button"),N=x.querySelector(".profile__avatar"),F=z.querySelector(".form__input_content_name"),J=z.querySelector(".form__input_content_job"),G=(D.querySelector(".form__input_content_place"),D.querySelector(".form__input_content_url"),{formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__save-button",inactiveButtonClass:"form__save-button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__error_visible"}),M=new i(".profile__title",".profile__subtitle",".profile__image"),K=new _(".popup_type_edit",(function(e){K.renderLoading(!0),ee.setUserInfo(e).then((function(e){M.setUserInfo(e),K.renderLoading(!1),K.close()})).catch((function(e){console.log(e)}))}));K.setEventListeners();var Q=new _(".popup_type_add",(function(e){Q.renderLoading(!0),ee.addCard(e).then((function(e){te.addItem(ne(e)),Q.renderLoading(!1),Q.close(),$.deactivateSaveButton()})).catch((function(e){console.log(e)}))}));Q.setEventListeners();var W=new w(".popup_type_card");W.setEventListeners();var X=new T(".popup_type_delete",(function(e){ee.deleteCard(e).then((function(t){e.deleteCard(),X.close()})).catch((function(e){console.log(e)}))}));X.setEventListeners();var Y=new _(".popup_type_avatar",(function(e){Y.renderLoading(!0),ee.setUserAvatar(e).then((function(e){M.setUserAvatar(e),Y.renderLoading(!1),Y.close()})).catch((function(e){console.log(e)}))}));Y.setEventListeners();var Z=new r(G,z);Z.enableValidation();var $=new r(G,D);$.enableValidation(),new r(G,V).enableValidation();var ee=new U({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-48/",headers:{authorization:"9c8b2d65-20ac-4a2a-9a38-45ba5cd9db7f","Content-Type":"application/json"}}),te=new q({items:{},renderer:function(e){newCardsSection.addItem(ne(e))}},".elements__cards");function ne(e){var n=new t(e,"#cardTemplate",M.getUserInfo(),{handleCardClick:function(){W.open(n)},handleDeleteClick:function(){X.open(n)},handleLikeClick:function(){ee.toggleLikeCard(n).then((function(e){n.toggleLike(e.likes)})).catch((function(e){console.log(e)}))}});return n.createCardElement()}A.addEventListener("click",(function(){var e=M.getUserInfo(),t=e.name,n=e.job;F.value=t,J.value=n,Z.hideErrors(),Z.activateSaveButton(),K.open()})),H.addEventListener("click",(function(){Q.open()})),N.addEventListener("click",(function(){Y.open()})),ee.getUserInfo().then((function(e){M.setUserInfo(e),M.setUserAvatar(e),ee.getInitialCards().then((function(e){e.reverse(),te.clear(),e.forEach((function(e){te.addItem(ne(e))}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})();