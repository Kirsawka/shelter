import PETS from "./script.js";

const popupOverlay = document.createElement('div');
const cross = document.createElement('div');
const crossImg = document.createElement('img');
const popup = document.createElement('div');
const petImgWrapper = document.createElement('div');
const petImg = document.createElement('img');
const popupContent = document.createElement('div');
const petName = document.createElement('h3');
const petType = document.createElement('span');
const petDescriptionText = document.createElement('p');
const petDescriptionList = document.createElement('ul');

popupOverlay.classList.add('overlay');
cross.classList.add('slider__button');
crossImg.src = '../../assets/images/cross.png';
crossImg.alt = 'cross';
popup.classList.add('popup');
petImgWrapper.classList.add('popup__img-wrapper');
petImg.classList.add('popup__img');
popupContent.classList.add('popup__content');
petName.classList.add('popup__title');
petType.classList.add('popup__pet-type');
petDescriptionText.classList.add('popup__description');
petDescriptionList.classList.add('popup__list');

popup.appendChild(petImgWrapper);
petImgWrapper.appendChild(petImg);
popup.appendChild(popupContent);

popupContent.appendChild(petName);
popupContent.appendChild(petType);
popupContent.appendChild(petDescriptionText);
popupContent.appendChild(petDescriptionList);

function openPopupWindow(id) {
  let objForList = {};

  if (PETS[id].img) {
    petImg.src = PETS[id].img;
  }
  if (PETS[id].type || PETS[id].name) {
    petImg.alt = `${PETS[id].type} ${PETS[id].name}`;
  }
  if (PETS[id].name) {
    petName.innerText = PETS[id].name;
  }
  if (PETS[id].type && PETS[id].breed) {
    petType.innerText = `${PETS[id].type} - ${PETS[id].breed}`;
  }
  if (PETS[id].description) {
    petDescriptionText.innerText = PETS[id].description;
  }
  if (PETS[id].age) {
    objForList.Age = PETS[id].age;
  }
  if (PETS[id].inoculations) {
    objForList.Inoculations = PETS[id].inoculations.join(', ');
  }
  if (PETS[id].diseases) {
    objForList.Diseases = PETS[id].diseases.join(', ');
  }
  if (PETS[id].parasites) {
    objForList.Parasites = PETS[id].parasites.join(', ');
  }

  document.body.appendChild(popupOverlay);
  popupOverlay.appendChild(popup);
  popup.appendChild(cross);
  cross.appendChild(crossImg);
  popupOverlay.classList.add('active');
  document.body.classList.add('lock');

  petDescriptionList.innerHTML = '';

  for (let property in objForList) {
    const li = document.createElement('li');
    const text = document.createElement('span');
    const textValue = document.createElement('span');
    const colon = document.createElement('span');

    text.textContent = property;
    colon.textContent = ': ';
    textValue.textContent = objForList[property];

    li.appendChild(text);
    li.appendChild(colon);
    li.appendChild(textValue);

    petDescriptionList.appendChild(li);
    li.classList.add('popup__list-item');
    colon.classList.add('popup__text');
    text.classList.add('popup__text');
  }
}

function closePopupWindow() {
  popupOverlay.classList.remove('active');
  document.body.classList.remove('lock');
}

popupOverlay.addEventListener('click', closePopupWindow);
cross.addEventListener('click', closePopupWindow);

export default openPopupWindow;
