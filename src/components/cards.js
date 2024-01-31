export const initialCards = [
    {
      name: 'Хабаровск',
      link: 'https://wikiway.com/upload/hl-photo/c07/58f/khabarovsk_105.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];

export const createCard = (cardData, cardDeletFn, cardLikeFn, cardClickFn, cardTemplate) => {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImg = cardElement.querySelector('.card__image');
  const cardDeletBtn = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImg.src = cardData.link;
  cardImg.alt = `Фотография ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  cardDeletBtn.addEventListener('click', cardDeletFn);

  cardLikeBtn.addEventListener('click', cardLikeFn);

  cardImg.addEventListener('click', () => cardClickFn(cardData.name, cardData.link));

  return cardElement;
}

export const deletCard = evt => {
  evt.target.closest('.places__item').remove();
}

export const likeCard = evt => {
  evt.target.classList.toggle('card__like-button_is-active')
};


