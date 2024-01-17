// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (cardData, cardDeletFn) => {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImg = cardElement.querySelector('.card__image');
  const cardDeletBtn = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardDeletBtn.addEventListener('click', cardDeletFn);

  return cardElement;
}

// @todo: Функция удаления карточки
const deletCardFuction = (evt) => {
  evt.target.closest('li').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(arrElem => {
  const renderNewCard = createCard(arrElem, deletCardFuction);
  cardList.append(renderNewCard);
});

