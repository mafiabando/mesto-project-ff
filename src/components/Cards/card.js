export function createCard(link, name, openImagePopup) {
    const card = template.querySelector('.card').cloneNode(true); // клонировали содержимое template
    const cardImage = card.querySelector('.card__image');
    card.querySelector('.card__title').textContent = name;
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button') // нашли кнопку удалить
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener('click', () => openImagePopup(name, link));
    cardDeleteButton.addEventListener('click', deleteCard);
    cardLikeButton.addEventListener('click', likeCard)
    return card;
    }

export const template = document.querySelector('#card-template').content;
    
export function deleteCard(evt) {
        evt.target.closest('.card').remove()
    }

export function likeCard(evt) {
        evt.target.classList.toggle('card__like-button_is-active')
    }