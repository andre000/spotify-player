/* global document */
import { mdiSpotify, mdiMagnify } from '@mdi/js';
import list from './list';
import search from './search';

export default {
  build() {
    this.createLogo();
    this.createSearchIcon();
    this.eventReopen();
    list.build();
    search.build();
  },

  createLogo() {
    const logo = document.getElementById('logo');
    const image = `<svg viewBox="0 0 24 24" style="width: 2.5rem"> <path d="${mdiSpotify}"></path> </svg>`;
    logo.insertAdjacentHTML('afterbegin', image);
  },

  eventReopen() {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('closed')) {
        e.target.classList.remove('closed');
        const main = document.querySelector('main.section');
        main.classList.add('closed');
      }
    });
  },

  createSearchIcon() {
    const searchIcon = document.querySelector('.search-icon');
    const image = `<svg viewBox="0 0 24 24" style="width: 1.5rem; fill: #fff9"> <path d="${mdiMagnify}"></path> </svg>`;
    searchIcon.innerHTML = image;
  },
};
