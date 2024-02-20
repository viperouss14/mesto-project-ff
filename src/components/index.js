import '../pages/index.css';
import { createCard, deletCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getProfileData, getCards, updateProfile, addNewCard, updateAvatar } from './api.js'

//************************* общие переменные ****************************

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');
let userId;
const renderLoading = (evt) => {
  evt.target.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранение...';
}

const renderLoadingIsOver = (evt) => {
  evt.target.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранить';
}

//функция обработки данных профиля с сервера
const setProfileData = (data) => {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  userId = data._id;
};

//функция обработки данных аватара с сервера
const setAvatarData = (data) => {
  avatarEditButton.style.backgroundImage = `url(${data.avatar})`;
};

//функция обработки данных карточек с сервера
const setCardsData = (cardsData) => {
  cardsData.forEach(card => {
    const renderNewCard = createCard(userId, card, deletCard, likeCard, openImagePopup, cardTemplate);
    cardList.append(renderNewCard);
  })
}

//************************* конфиг для валидации форм ****************************

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//*************************** работа с профилем **********************************

const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = popupEditProfile.querySelector('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt);

  updateProfile(nameInput.value, jobInput.value)
  .then((res) => {
    setProfileData(res);
    closeModal(popupEditProfile);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoadingIsOver(evt));
}

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});

formEditProfile.addEventListener('submit', handleProfileEditFormSubmit);

buttonCloseProfile.addEventListener('click', () => closeModal(popupEditProfile));

//*************************** работа с добавлением аватара ************************************

const avatarEditButton = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const buttonClosePopupAddAvatar = popupEditAvatar.querySelector('.popup__close');

const formEditAvatar = document.forms['avatar'];
const inputUrlAvatar = formEditAvatar.elements['avatar-link'];

avatarEditButton.addEventListener('click', () => {
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupEditAvatar);
})

function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt);

  updateAvatar(inputUrlAvatar.value)
  .then(res => {
    setAvatarData(res);
    closeModal(popupEditAvatar);
    formEditAvatar.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoadingIsOver(evt));
}

formEditAvatar.addEventListener('submit', handleAvatarEditFormSubmit);

buttonClosePopupAddAvatar.addEventListener('click', () => {
  closeModal(popupEditAvatar);
  formEditAvatar.reset();
})

//*************************** работа с добавлением новых карточек *******************************

const popupAddCard = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close');

const formAddCard = document.forms['new-place'];
const inputPlace = formAddCard.elements['place-name'];
const inputLink = formAddCard.elements['link'];

buttonAddCard.addEventListener('click', () => {
  clearValidation(formAddCard, validationConfig);
  openModal(popupAddCard);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt);

  const newCardData = {
    name: inputPlace.value,
    link: inputLink.value
  };

  addNewCard(newCardData)
  .then(res => {
    const newCard = createCard(userId, res, deletCard, likeCard, openImagePopup, cardTemplate);
    cardList.prepend(newCard);
    closeModal(popupAddCard);
    formAddCard.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoadingIsOver(evt));
}

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

buttonClosePopupAddCard.addEventListener('click', () => {
  closeModal(popupAddCard);
  formAddCard.reset();
});

//*************************** работа с фотографиями (увеличение фото при клике) ****************************

const popupImage = document.querySelector('.popup_type_image');
const imagePopupImage = popupImage.querySelector('.popup__image');
const captionPopupImage = popupImage.querySelector('.popup__caption');
const buttonClosePopupImage = popupImage.querySelector('.popup__close');

const openImagePopup = (name, link) => {
  imagePopupImage.src = link;
  imagePopupImage.alt = `Фотография ${name}`;
  captionPopupImage.textContent = name;

  openModal(popupImage);
}

buttonClosePopupImage.addEventListener('click', () => closeModal(popupImage));

//************************* активация валидации форм ****************************

enableValidation(validationConfig);

//************************* получение данных профиля и карточек через API ****************************

  Promise.all([getProfileData(), getCards()])
    .then(([profile, cards]) => {
      setProfileData(profile);
      setAvatarData(profile);
      setCardsData(cards);
    })
    .catch(error => {
      console.error(error);
    });
