const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '55316744-d36208193e3c53252b47581ad';

export const fetchImages = (query, page = 1) => {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}`).then(res => res.json());
}