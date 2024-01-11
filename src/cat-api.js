import axios from "axios";

const API_KEY = 'live_V5FVlqndPvCW5Cw4ggv9qV4wy56znr2jYjLyszG5GGnmhyTQtFamzlMaodi7CrtS'

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds'

    return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw error; 
    });
}

export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`

    return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw error; 
    });
}


