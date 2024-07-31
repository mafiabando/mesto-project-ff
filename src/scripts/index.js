import '../pages/index.css';
import { initialCards } from './cards.js';
import { closeEscKey, closeOverlay, closeButton, openModal, closeModal } from '../components/Modals/modal.js';
import { createCard, popupCardImage, template, deleteCard, likeCard } from '../components/Cards/card.js';

const gallery = document.querySelector('.places__list');
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const title = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
    

function handleFormSubmit(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    description.textContent = jobInput.value;
    closeModal(popup);
}

formElement.addEventListener('submit', handleFormSubmit); 

profileEditButton.addEventListener('click', function(evt) {
    openModal(popupEditProfile);
    nameInput.value = title.textContent;
    jobInput.value = description.textContent;
}); // повесили слушатель на кнопку

// Cards
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const popupAddCard = document.querySelector('.popup_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const profileAddButton = document.querySelector('.profile__add-button');

profileAddButton.addEventListener('click', function(evt) {
    openModal(popupAddCard)
}) // повесили слушатель на кнопку

initialCards.forEach((card) => {
    const newCard = createCard(card.link, card.name )
    gallery.append(newCard);
});

function addCardSubmit(evt) {
    evt.preventDefault();
    const name = cardNameInput.value;
    const link = cardLinkInput.value;
    const newCard = createCard(link, name);
    addCard(newCard);
    addCardForm.reset();
    closeModal(popupAddCard);
}

function addCard(card) {
    gallery.prepend(card);
}

addCardForm.addEventListener('submit', addCardSubmit);
  
// Popup

popupEditProfile.addEventListener('mousedown', closeOverlay) // повесили слушатель на клик по оверлею
popupEditProfile.addEventListener('keydown', closeEscKey) // повесили слушатель на esc
popupEditProfile.addEventListener('click', closeButton) // повесили слушатель на кнопку
popupAddCard.addEventListener('mousedown', closeOverlay) // повесили слушатель на клик по оверлею
popupAddCard.addEventListener('keydown', closeEscKey) // повесили слушатель на esc
popupAddCard.addEventListener('click', closeButton) // повесили слушатель на кнопку
popupCardImage.addEventListener('mousedown', closeOverlay) // повесили слушатель на клик по оверлею
popupCardImage.addEventListener('keydown', closeEscKey) // повесили слушатель на esc
popupCardImage.addEventListener('click', closeButton) // повесили слушатель на кнопку