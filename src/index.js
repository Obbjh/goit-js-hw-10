import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

selectEl.addEventListener('change', onSelect);

function onSelect(e) {
    catInfoEl.innerHTML = '';
    const breedParse = fetchCatByBreed(e.target.value);

    breedParse.then(breed => {
        articleMarkup(breed[0]);
    }).catch(error => {
        return errorText.textContent
    })
}

function selectMarkup(breeds) {
    const selectMarkup = breeds.map(breed => {
        return '<option value="${breed.id}">${breed.name}</option>';
    }).join();

    selectEl.innerHTML = selectMarkup;
}

function articleMarkup(breed) {
    const articleMarkup = '<h1>breed.name</h1><p>breed.description</p><p><strong>temperament: </strong>breed.temperament</p><img src = breed.url>'
       
    selectEl.innerHTML = articleMarkup;
}

const breedsParser = fetchBreeds();

breedsParser.then(breeds => {
    selectMarkup(breeds);
}).catch(error => {
    return errorText.textContent
});
