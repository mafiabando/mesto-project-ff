    const gallery = document.querySelector('.places__list');
    const template = document.querySelector('#card-template').content;
    
    const createCard = (imgUrl, title) => {
        const card = template.querySelector('.card').cloneNode(true); // клонировали содержимое template
        const cardDeleteButton = card.querySelector('.card__delete-button') // нашли кнопку удалить
        card.querySelector('.card__image').src = imgUrl; 
        card.querySelector('.card__title').textContent = title;   
        cardDeleteButton.addEventListener('click', deleteCard);
        return card;
    }
    
    initialCards.forEach((card) => {
        const newCard = createCard(card.link, card.name) // создание карточки
        gallery.append(newCard); // добавление в контейнер
    });

    function deleteCard(event) {
    event.target.closest('.card').remove()
}
 