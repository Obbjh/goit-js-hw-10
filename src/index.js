import { fetchBreeds, fetchCatByBreed } from './cat-api';

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
            errorText.textContent = 'Oops! Something went wrong! Try reloading the page!';
            console.error('Oops! Something went wrong! Try reloading the page!', error);
        });
}

function onSelect(e) {
    catInfoEl.innerHTML = '';

    fetchCatByBreed(e.target.value)
        .then(breed => {
            articleMarkup(breed[0]);
        })
        .catch(error => {
            errorText.textContent = 'Oops! Something went wrong! Try reloading the page!';
            console.error('Oops! Something went wrong! Try reloading the page!', error);
        });
}

function articleMarkup() {
    const article = document.createElement('article');

    catInfoEl.appendChild(article);
}
