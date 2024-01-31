import './pages/index.css';
import { initialCards } from './components/cards_array.js';
import { createCard, deletCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

//*************************** работа с профилем **********************************

const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = popupEditProfile.querySelector('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEditProfile);
});

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileDescription.textContent = job;

  closeModal(evt.target.closest('.popup'));
}

formEditProfile.addEventListener('submit', handleProfileEditFormSubmit);

buttonCloseProfile.addEventListener('click', () => closeModal(popupEditProfile));


//*************************** работа с добавлением карточек ************************************

const popupAddCard = document.querySelector('.popup_type_new-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close');

const formAddCard = document.forms['new-place'];
const inputPlace = formAddCard.elements['place-name'];
const inputLink = formAddCard.elements['link'];

buttonAddCard.addEventListener('click', () => openModal(popupAddCard));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: inputPlace.value,
    link: inputLink.value
  };

  const newCard = createCard(newCardData, deletCard, likeCard, openImagePopup, cardTemplate);
  cardList.prepend(newCard);

  closeModal(evt.target.closest('.popup'));
  formAddCard.reset();
}

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

buttonClosePopupAddCard.addEventListener('click', () => closeModal(popupAddCard));

//*************************** работа с фотографиями *******************************************

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

//*************************** итоговая отрисовка карточек *******************************************

initialCards.forEach(arrElem => {
  const renderNewCard = createCard(arrElem, deletCard, likeCard, openImagePopup, cardTemplate);
  cardList.append(renderNewCard);
});
