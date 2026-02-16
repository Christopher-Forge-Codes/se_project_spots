const initialCards = [
{
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
},
 {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
},
{
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
},
{
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
},
{
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
},
{
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
},
{
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
},
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const newPostBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostImageLink = newPostModal.querySelector("#post-image-input");
const newPostCaptionInput = newPostModal.querySelector("#post-title-input");


const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");
const newPostForm = newPostModal.querySelector(".modal__form");





const cardTemplate = document
.querySelector("#card-template")
.content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
const cardElement = cardTemplate.cloneNode(true);
const cardTitleEl = cardElement.querySelector(".card__title");
const cardImageEl = cardElement.querySelector(".card__image");

const cardLikeButton = cardElement.querySelector(".card__like-button")
cardLikeButton.addEventListener("click", () => {
cardLikeButton.classList.toggle("card__like-button_active")
});

const cardDeleteButton = cardElement.querySelector(".card__delete-button")
cardDeleteButton.addEventListener("click", () => {
cardElement.remove();
});  

cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
});


cardImageEl.src = data.link;
cardImageEl.alt = data.name;
cardTitleEl.textContent = data.name;

return cardElement;
}

function openModal(modal) { 
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
} 

editProfileBtn.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent.trim();
    editProfileDescriptionInput.value = profileDescriptionEl.textContent.trim();
    openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
    closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
    openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
    closeModal(newPostModal);
});

previewModalCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});


function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value.trim();
    profileDescriptionEl.textContent = editProfileDescriptionInput.value.trim();
    closeModal(editProfileModal);
}

function handleNewPostSubmit(evt) {
    evt.preventDefault();

    const inputValues = {
        name: newPostCaptionInput.value,
        link: newPostImageLink.value,
    };

    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);

    newPostForm.reset();
    closeModal(newPostModal);
}


editProfileForm.addEventListener("submit", handleEditProfileSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach (function (item) {
const cardElement = getCardElement(item);
cardsList.append(cardElement);  
}); 
