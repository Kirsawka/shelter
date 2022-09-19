import openPopupWindow from './popup.js';

const headerBurger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');
const overlay = document.querySelector('.overlay');
const navList = document.querySelector('.nav-list');
const CAROUSEL = document.getElementById('carousel');
const ITEM_LEFT = document.getElementById('item-left');
const ITEM_RIGHT = document.getElementById('item-right');
const ITEM_ACTIVE = document.getElementById('item-active');
const slider = document.querySelector('.slider');
const petCardsContainer = document.querySelector(".pet-cards-container");
const pageNumber = document.getElementById('page-number');
const firstPage = document.getElementById('first-page');
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
const lastPage = document.getElementById('last-page');
const petsPerPage = 8;
let itemActive = [];
let itemRight = [];
let itemLeft = [];
let pageNumberCount = 1;

const PETS = await getData();

async function getData() {
  const data = await fetch('../../data.json');
  return await data.json();
}

PETS.map((elem, i) => {
  if (!elem.id) {
    elem.id = i;
  }
});

function createStartSliderCards(arr, item) {
  arr.forEach((elem) => {
    let changedItem = item;
    const sliderCard = document.createElement('div');
    sliderCard.classList.add('slider__card');
    sliderCard.setAttribute('id', PETS[elem].id);

    const image = document.createElement('img');
    image.classList.add('slider__img');
    image.src = PETS[elem].img;
    image.alt = `${PETS[elem].type} ${PETS[elem].name}`;

    const sliderSubtitle = document.createElement('h4');
    sliderSubtitle.classList.add('slider__subtitle');
    sliderSubtitle.textContent = PETS[elem].name;

    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'Learn more';

    sliderCard.appendChild(image);
    sliderCard.appendChild(sliderSubtitle);
    sliderCard.appendChild(button);

    if (changedItem) {
      changedItem.appendChild(sliderCard);
    }
  });
}

function toggleBurgerMenu() {
  headerBurger.classList.toggle('active');
  headerNav.classList.toggle('active');
  document.body.classList.toggle('lock');
}

headerBurger.addEventListener('click', toggleBurgerMenu);
overlay.addEventListener('click', toggleBurgerMenu);
navList.addEventListener('click', event => {
  const target = event.target;
  if (target.classList.contains('nav-list__link')) {
    toggleBurgerMenu();
  }
});

function getViewportWidth() {
  let mainSliderCount, petsSliderCount, petsPagesCount;
  const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  if (viewportWidth >= 1280) {
    mainSliderCount = 3;
    petsSliderCount = 8;
    petsPagesCount = 6;
  }
  if (viewportWidth <= 1279) {
    mainSliderCount = 2;
    petsSliderCount = 6;
    petsPagesCount = 8;
  }
  if (viewportWidth <= 767) {
    mainSliderCount = 1;
    petsSliderCount = 3;
    petsPagesCount = 16;
  }
  return {mainSliderCount, petsSliderCount, petsPagesCount};
}

window.addEventListener('resize', getViewportWidth);

function getItemActiveArray() {
  const {mainSliderCount} = getViewportWidth();
  while (itemActive.length < mainSliderCount) {
    let randomCardNum = Math.floor(Math.random() * 8);
    if (!itemActive.includes(randomCardNum)) {
      itemActive.push(randomCardNum);
    }
  }
}

function getItemRightArray() {
  itemRight = [];
  const {mainSliderCount} = getViewportWidth();
  while (itemRight.length < mainSliderCount) {
    let randomCardNum = Math.floor(Math.random() * 8);
    if (!itemActive.includes(randomCardNum)) {
      if (!itemRight.includes(randomCardNum)) {
        itemRight.push(randomCardNum);
      }
    }
  }
}

function getItemLeftArray() {
  itemLeft = [];
  const {mainSliderCount} = getViewportWidth();
  while (itemLeft.length < mainSliderCount) {
    let randomCardNum = Math.floor(Math.random() * 8);
    if (!itemActive.includes(randomCardNum)) {
      if (!itemLeft.includes(randomCardNum)) {
        itemLeft.push(randomCardNum);
      }
    }
  }
}

getItemActiveArray();
getItemRightArray();
getItemLeftArray();

function moveSlider(event) {
  const target = event.target;
  if (target.id === 'btn-left') {
    CAROUSEL.classList.add("transition-left");
  }
  if (target.id === 'btn-right') {
    CAROUSEL.classList.add("transition-right");
  }
}

if (slider) {
  slider.addEventListener('click', moveSlider);
}

if (CAROUSEL) {
  CAROUSEL.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
      CAROUSEL.classList.remove("transition-left");

      ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
      itemActive = itemLeft;

      getItemRightArray();
      getItemLeftArray();

      ITEM_LEFT.innerHTML = "";
      ITEM_RIGHT.innerHTML = "";

      createStartSliderCards(itemLeft, ITEM_LEFT);
      createStartSliderCards(itemRight, ITEM_RIGHT);
    }

    if (animationEvent.animationName === "move-right") {
      CAROUSEL.classList.remove("transition-right");

      ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
      itemActive = itemRight;

      getItemLeftArray();
      getItemRightArray();

      ITEM_RIGHT.innerHTML = "";
      ITEM_LEFT.innerHTML = "";

      createStartSliderCards(itemRight, ITEM_RIGHT);
      createStartSliderCards(itemLeft, ITEM_LEFT);
    }
  });
}

if (ITEM_ACTIVE) {
  ITEM_ACTIVE.addEventListener('click', (event) => {
    let id = event.target.closest('.slider__card').id;
    openPopupWindow(id);
  });
}

// ------------------   СТРАНИЦА 'OUR PETS' ----------------------------

function getPetsPageArray() {
  const {petsPagesCount} = getViewportWidth();
  const petsPageArray = [];
  while (petsPageArray.length < petsPagesCount) {
    const petsPageArrayElem = [];
    while (petsPageArrayElem.length < petsPerPage) {
      const random = Math.floor(Math.random() * petsPerPage);
      if (!petsPageArrayElem.includes(random)) {
        petsPageArrayElem.push(random);
      }
    }
    petsPageArray.push(petsPageArrayElem);
  }
  return petsPageArray.flat();
}

function getPetsForPageArray() {
  const {petsSliderCount} = getViewportWidth();
  const petsPageArray = getPetsPageArray();
  const petsForPage = [];
  for (let i = 0; i < petsPageArray.length; i += petsSliderCount) {
    petsForPage.push(petsPageArray.slice(i, i + petsSliderCount));
  }
  return petsForPage;
}

if (petCardsContainer) {
  petCardsContainer.addEventListener('click', (event) => {
    let id = event.target.closest('.slider__card').id;
    openPopupWindow(id);
  });
}

if (pageNumber) {
  pageNumber.textContent = `${pageNumberCount}`;
}

if (firstPage) {
  firstPage.classList.add('navigation__button_disabled');
}

if (prevPage) {
  prevPage.classList.add('navigation__button_disabled');
}

function getNextPage() {
  const petsForPage = getPetsForPageArray();
  const {petsPagesCount} = getViewportWidth();
  pageNumberCount++;
  pageNumber.textContent = `${pageNumberCount}`;

  firstPage.classList.remove('navigation__button_disabled');
  prevPage.classList.remove('navigation__button_disabled');

  prevPage.addEventListener('click', getPrevPage);
  firstPage.addEventListener('click', getFirstPage);

  if (pageNumberCount === petsPagesCount) {
    nextPage.classList.add('navigation__button_disabled');
    lastPage.classList.add('navigation__button_disabled');

    nextPage.removeEventListener('click', getNextPage);
    lastPage.removeEventListener('click', getLastPage);
  }
  petCardsContainer.innerHTML = '';
  createStartSliderCards(petsForPage[`${pageNumberCount}` - 1], petCardsContainer);
}

if (nextPage) {
  nextPage.addEventListener('click', getNextPage);
}

function getLastPage() {
  const petsForPage = getPetsForPageArray();
  const {petsPagesCount} = getViewportWidth();
  pageNumberCount = petsPagesCount;
  pageNumber.textContent = `${pageNumberCount}`;

  nextPage.classList.add('navigation__button_disabled');
  lastPage.classList.add('navigation__button_disabled');

  firstPage.classList.remove('navigation__button_disabled');
  prevPage.classList.remove('navigation__button_disabled');

  nextPage.removeEventListener('click', getNextPage);
  lastPage.removeEventListener('click', getLastPage);

  prevPage.addEventListener('click', getPrevPage);
  firstPage.addEventListener('click', getFirstPage);

  petCardsContainer.innerHTML = '';
  createStartSliderCards(petsForPage[`${pageNumberCount}` - 1], petCardsContainer);
}

if (lastPage) {
  lastPage.addEventListener('click', getLastPage);
}

function getPrevPage() {
  const petsForPage = getPetsForPageArray();
  pageNumberCount--;
  pageNumber.textContent = `${pageNumberCount}`;

  nextPage.classList.remove('navigation__button_disabled');
  lastPage.classList.remove('navigation__button_disabled');

  nextPage.addEventListener('click', getNextPage);
  lastPage.addEventListener('click', getLastPage);

  if (pageNumberCount <= 1) {
    pageNumberCount = 1;
    pageNumber.textContent = `${pageNumberCount}`;

    firstPage.classList.add('navigation__button_disabled');
    prevPage.classList.add('navigation__button_disabled');

    prevPage.removeEventListener('click', getPrevPage);
    firstPage.removeEventListener('click', getFirstPage);
  }

  petCardsContainer.innerHTML = '';
  createStartSliderCards(petsForPage[`${pageNumberCount}` - 1], petCardsContainer);
}

if (prevPage) {
  prevPage.addEventListener('click', getPrevPage);
}

function getFirstPage() {
  const petsForPage = getPetsForPageArray();
  pageNumberCount = 1;
  pageNumber.textContent = `${pageNumberCount}`;

  firstPage.classList.add('navigation__button_disabled');
  prevPage.classList.add('navigation__button_disabled');

  nextPage.classList.remove('navigation__button_disabled');
  lastPage.classList.remove('navigation__button_disabled');

  prevPage.removeEventListener('click', getPrevPage);
  firstPage.removeEventListener('click', getFirstPage);

  nextPage.addEventListener('click', getNextPage);
  lastPage.addEventListener('click', getLastPage);

  petCardsContainer.innerHTML = '';
  createStartSliderCards(petsForPage[`${pageNumberCount}` - 1], petCardsContainer);
}

if (firstPage) {
  firstPage.addEventListener('click', getPrevPage);
}

createStartSliderCards(itemLeft, ITEM_LEFT);
createStartSliderCards(itemActive, ITEM_ACTIVE);
createStartSliderCards(itemRight, ITEM_RIGHT);
const petsForPage = getPetsForPageArray();
createStartSliderCards(petsForPage[0], petCardsContainer);

export default PETS;
