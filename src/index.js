import './pages/index.css';
import { initialCards, createCard, deletCard, likeCard } from './components/cards.js'
import { openModal, closeModal } from './components/modal.js';

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

//*************************** работа с профилем **********************************

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profileEditPopup.querySelector('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.elements['name'];
const jobInput = profileEditForm.elements['description'];

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(profileEditPopup);
});

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileDescription.textContent = job;

  closeModal(evt.target.closest('.popup'));
}

profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);

profileCloseButton.addEventListener('click', () => closeModal(profileEditPopup));


//*************************** работа с добавлением карточек ************************************

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardCloseButton = addCardPopup.querySelector('.popup__close');

const addCardForm = document.forms['new-place'];
const placeInput = addCardForm.elements['place-name'];
const linkInput = addCardForm.elements['link'];

addCardButton.addEventListener('click', () => openModal(addCardPopup));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeInput.value,
    link: linkInput.value
  };

  const newCard = createCard(newCardData, deletCard, likeCard, openImagePopup, cardTemplate);
  cardList.prepend(newCard);

  closeModal(evt.target.closest('.popup'));
  addCardForm.reset();
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

addCardCloseButton.addEventListener('click', () => closeModal(addCardPopup));

//*************************** работа с фотографиями *******************************************

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

const openImagePopup = (name, link) => {
  imagePopupImage.src = link;
  imagePopupImage.alt = `Фотография ${name}`;
  imagePopupCaption.textContent = name;

  openModal(imagePopup);
}

imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

//*************************** итоговая отрисовка карточек *******************************************

initialCards.forEach(arrElem => {
  const renderNewCard = createCard(arrElem, deletCard, likeCard, openImagePopup, cardTemplate);
  cardList.append(renderNewCard);
});
