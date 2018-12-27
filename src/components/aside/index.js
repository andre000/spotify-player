/* global document */
import { mdiSpotify, mdiMagnify } from '@mdi/js';

export default {
  build() {
    this.createLogo();
    this.createSearchIcon();
  },

  createLogo() {
    const logo = document.getElementById('logo');
    const image = `<svg viewBox="0 0 24 24" style="width: 2.5rem"> <path d="${mdiSpotify}"></path> </svg>`;
    logo.insertAdjacentHTML('afterbegin', image);
  },

  createSearchIcon() {
    const searchIcon = document.querySelector('.search-icon');
    const image = `<svg viewBox="0 0 24 24" style="width: 1.5rem; fill: #fff9"> <path d="${mdiMagnify}"></path> </svg>`;
    searchIcon.innerHTML = image;
  },
};
