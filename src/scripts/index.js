import '../pages/index.css';
import { initialCards } from './cards.js';
import { closeEscKey, closeOverlay, closeButton, openModal, closeModal } from '../components/Modals/modal.js';
import { createCard, template, deleteCard, likeCard } from '../components/Cards/card.js';

const gallery = document.querySelector('.places__list');
const popupProfile = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const titleProfile = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
const popupCardImage = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
    

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    titleProfile.textContent = nameInput.value;
    description.textContent = jobInput.value;
    closeModal(popupProfile);
}

formProfile.addEventListener('submit', handleProfileFormSubmit); 

profileEditButton.addEventListener('click', function(evt) {
    openModal(popupEditProfile);
    nameInput.value = titleProfile.textContent;
    jobInput.value = description.textContent;
}); // повесили слушатель на кнопку

// Cards
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const popupAddCard = document.querySelector('.popup_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

profileAddButton.addEventListener('click', function(evt) {
    openModal(popupAddCard);
}) // повесили слушатель на кнопку

initialCards.forEach((card) => {
    const newCard = createCard(card.link, card.name, openImagePopup);
    gallery.append(newCard);
});

function addCardSubmit(evt) {
    evt.preventDefault();
    const name = cardNameInput.value;
    const link = cardLinkInput.value;
    const newCard = createCard(link, name, openImagePopup);
    addCard(newCard);
    addCardForm.reset();
    closeModal(popupAddCard);
}

function addCard(card) {
    gallery.prepend(card);
}

addCardForm.addEventListener('submit', addCardSubmit);
  
// Popup


function openImagePopup(name, link) {
    openModal(popupCardImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
}

popupEditProfile.addEventListener('mousedown', closeOverlay) // повесили слушатель на клик по оверлею
popupEditProfile.addEventListener('click', closeButton) // повесили слушатель на кнопку*

popupAddCard.addEventListener('mousedown', closeOverlay) // повесили слушатель на клик по оверлею
popupAddCard.addEventListener('click', closeButton) // повесили слушатель на кнопку

popupCardImage.addEventListener('mousedown', closeOverlay) // повесили слушатель на клик по оверлею
popupCardImage.addEventListener('click', closeButton) // повесили слушатель на кнопку