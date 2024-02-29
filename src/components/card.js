import { deleteCardByApi, addCardLike, removeCardLike } from './api.js';
import { imagePopupImage, captionPopupImage, popupImage, confirmationPopup, openConfirmationPopup } from './index.js'
import { openModal, closeModal } from './modal.js';

const likeCard = (cardId, likeButton, likeCounter) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeCardLike(cardId)
      .then((cardData) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = cardData.likes.length;
      })
      .catch((err) => console.log(err));
    } else {
      addCardLike(cardId)
      .then((cardData) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = cardData.likes.length;
      })
      .catch((err) => console.log(err));
  }
};

const deletCard = (cardId, card) => {
  openConfirmationPopup(() => {
    deleteCardByApi(cardId)
    .then(() => {
      card.remove();
      closeModal(confirmationPopup);
    })
    .catch((err) => console.log(err));
  });
};

const openImagePopup = (name, link) => {
  imagePopupImage.src = link;
  imagePopupImage.alt = `Фотография ${name}`;
  captionPopupImage.textContent = name;

  openModal(popupImage);
}

export const createCardFunctions = {
  cardDeletFn: deletCard,
  cardLikeFn: likeCard,
  cardClickFn: openImagePopup
};

export const createCard = (userId, cardData, createCardFunctions, cardTemplate) => {

  const cardItem = cardTemplate.content.querySelector('.places__item');
  const cardElement = cardItem.cloneNode(true);

  const cardImg = cardElement.querySelector('.card__image');
  const cardDeletBtn = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImg.src = cardData.link;
  cardImg.alt = `Фотография ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if(userId !== cardData.owner._id) cardDeletBtn.remove();

  if(cardData.likes.some(elem => elem._id === userId)) cardLikeBtn.classList.add('card__like-button_is-active');

  cardDeletBtn.addEventListener('click', () => createCardFunctions.cardDeletFn(cardData._id, cardElement));

  cardLikeBtn.addEventListener('click', () => createCardFunctions.cardLikeFn(cardData._id, cardLikeBtn, cardLikeCounter));

  cardImg.addEventListener('click', () => createCardFunctions.cardClickFn(cardData.name, cardData.link));

  return cardElement;
}
