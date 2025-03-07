'use strict';

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

//Objetos con cada gatito
// const kittenData_1 = {
//   image: 'https://dev.adalab.es/gato-siames.webp',
//   name: 'Anastacio',
//   desc: 'Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.',
//   race: 'Siamés',
// };
// const kittenData_2 = {
//   image: 'https://dev.adalab.es/sphynx-gato.webp',
//   name: 'Fiona',
//   desc: 'Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.',
//   race: 'Sphynx',
// };
// const kittenData_3 = {
//   image: 'https://dev.adalab.es/maine-coon-cat.webp',
//   name: 'Cielo',
//   desc: ' Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.',
//   race: 'Maine Coon',
// };

// const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];
let kittenDataList = [];

//Funciones
// function renderKitten(kittenData) {
//   const kitten = `<li class="card">
//     <article>
//       <img
//         class="card_img"
//         src=${kittenData.image}
//         alt="gatito"
//       />
//       <h3 class="card_title">${kittenData.name}</h3>
//       <h3 class="card_race">${kittenData.race}</h3>
//       <p class="card_description">
//       ${kittenData.desc}
//       </p>
//     </article>
//     </li>`;
//   return kitten;
// }

// cambiar la función renderKitten usando los métodos del DOM avanzadndo

function renderKitten(kittenData) {
  const kitten = document.createElement('li');
  kitten.setAttribute('class', "card")
  listElement.appendChild(kitten);
  const kittenArticle = document.createElement('article');
  kitten.appendChild(kittenArticle);
  const imgKitten = document.createElement('img');
  const titleName = document.createElement('h3');
  const titleRace = document.createElement('h3');
  const textDesc = document.createElement('p');
  kittenArticle.appendChild(imgKitten);
  kittenArticle.appendChild(titleName);
  kittenArticle.appendChild(titleRace);
  kittenArticle.appendChild(textDesc);
  imgKitten.setAttribute('src', kittenData.image);
  imgKitten.setAttribute('class', "card_img");
  imgKitten.setAttribute('alt', "gatito");
  const titleNameText = document.createTextNode(kittenData.name);
  titleName.appendChild(titleNameText);
  titleName.setAttribute('class', "card_title");
  const titleRaceText = document.createTextNode(kittenData.race);
  titleRace.appendChild(titleRaceText);
  titleRace.setAttribute('class', "card_race");
  const descText = document.createTextNode(kittenData.desc);
  textDesc.appendChild(descText);
  textDesc.setAttribute('class', "card_description")
  return kitten;
}

function renderKittenList(kittenListStored) {
  listElement.innerHTML = '';
  for (const kittenItem of kittenListStored) {
    listElement.appendChild(renderKitten(kittenItem));
  }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
  newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  labelMessageError.innerHTML = '';
  if (newFormElement.classList.contains('collapsed')) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;
  const newKittenDataObject = {
    desc: valueDesc,
    name: valueName,
    image: valuePhoto,
    race: valueRace,
  };
  emptyInputs(event);
  renderKittenList(kittenDataList);
  if (valueDesc === '' || valuePhoto === '' || valueName === '') {
    labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
  } else if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
    labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
    kittenDataList.push(newKittenDataObject);
  }
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add('collapsed');
  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';
  inputRace.value = '';
  labelMessageError.innerHTML = '';
}

// Limpiar inputs
function emptyInputs(event) {
  event.preventDefault();
  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';
  inputRace.value = '';
}

//Filtrar por descripción
function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value;
  const raceSearchText = input_search_race.value;

  listElement.innerHTML = '';
  const newFilterKitten = kittenListStored
    .filter((kitten) =>
      kitten.desc.toLowerCase().includes(descrSearchText.toLowerCase())
    )
    .filter((kitten) =>
      kitten.race.toLowerCase().includes(raceSearchText.toLowerCase())
    );

  renderKittenList(newFilterKitten);
  console.log(newFilterKitten);
}
// renderKittenList(kittenDataList);

// Obtener listado de gatitos desde el servidor

const GITHUB_USER = 'NataliaPuertac';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));
console.log(kittenListStored);

if (kittenListStored) {
  renderKittenList(kittenListStored);
} else {
  fetch(SERVER_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('kittensList', JSON.stringify(data.results));
      kittenDataList = data.results;
      renderKittenList(kittenDataList);
    })
    .catch((error) => {
      console.error(error);
    });
}


//BONUS

// function addNewKitten(event) {
//   event.preventDefault();
//   const valueDesc = inputDesc.value;
//   const valuePhoto = inputPhoto.value;
//   const valueName = inputName.value;
//   const valueRace = inputRace.value;
//   const newKittenDataObject = {
//     desc: valueDesc,
//     name: valueName,
//     image: valuePhoto,
//     race: valueRace,
//   };

//   fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newKittenDataObject),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       if (data.success) {
//         renderKittenList(newKittenDataObject);
//         localStorage.setItem('newCat', JSON.stringify(newKittenDataObject));
//         renderKittenList(kittenListStored);
//       }
//       // else {
//       //   //     .catch((error) => {
//       //   //     console.error(error);
//       //   // });
//       // }
//     });

//   emptyInputs(event);
//   renderKittenList(kittenDataList);
//   if (valueDesc === '' || valuePhoto === '' || valueName === '') {
//     labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
//   } else if (valueDesc !== '' && valuePhoto !== '' && valueName !== '') {
//     labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
//     kittenDataList.push(newKittenDataObject);
//   }
// }

// cambiar a DOM avanzado

//Eventos
linkNewFormElememt.addEventListener('click', handleClickNewCatForm);
searchButton.addEventListener('click', filterKitten);
buttonAdd.addEventListener('click', addNewKitten);
buttonCancelForm.addEventListener('click', cancelNewKitten);
