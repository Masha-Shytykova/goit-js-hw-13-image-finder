const API_KEY = '22954093-157d8252386abbab9843eb1e8';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.perPage = 12;
    this.page = 1;
  }
  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.page += 1;

        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
