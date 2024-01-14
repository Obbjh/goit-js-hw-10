import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

populateBreeds()

selectEl.addEventListener('change', onSelect);

function populateBreeds() {
    fetchBreeds()
        .then(breeds => {
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.textContent = breed.name;
                selectEl.appendChild(option);
            });
        })
        .catch(error => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
      );
        });
}

function onSelect(e) {
    Notiflix.Loading.standard('Loading data, please wait...');
    catInfoEl.innerHTML = '';

    fetchCatByBreed(e.target.value)
        .then(breed => {
            articleMarkup(breed[0]);
            Notiflix.Loading.remove();
        })
        .catch(error => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
      );
        });
}

function articleMarkup(breed) {
  const { url, breeds } = breed;
  const { name, description, temperament } = breeds[0];
    
    const markupSelect = `
    <img src="${url}" alt="${name}" style="max-width: 100%; max-height: 200px; margin-right: 10px;">
    <div>
      <h1 style="margin: 0px; font-size: 24px; color: #333;">${name}</h1>
      <p>${description}</p>
      <p><span style="font-weight: bold; color: #ff6600;">Temperament: </span>${temperament}</p>
    </div>`;

  catInfoEl.innerHTML = markupSelect;
}



