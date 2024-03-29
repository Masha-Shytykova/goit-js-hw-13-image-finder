import './sass/main.scss';
import ApiService from './apiService.js';
import cardsTemplate from '../src/templates/cards.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchResult: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;

  if (apiService.query.trim() === '') {
    return alert('Enter your request');
  }
  apiService.resetPage();
  apiService.fetchImages().then(hits => {
    clearSearchResultList();
    appendCardsMarkup(hits);
    if (hits.length === 12) {
      refs.loadMoreBtn.classList.toggle('is-hidden');
    }

    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function onLoadMore() {
  apiService.fetchImages().then(hits => {
    appendCardsMarkup(hits);
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    if (hits.length !== 12) {
      refs.loadMoreBtn.classList.toggle('is-hidden');
    }
  });
}

function appendCardsMarkup(hits) {
  refs.searchResult.insertAdjacentHTML('beforeend', cardsTemplate(hits));
}

function clearSearchResultList() {
  refs.searchResult.innerHTML = '';
}
