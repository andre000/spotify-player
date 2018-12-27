/* global document */
import { mdiSpotify } from '@mdi/js';

export default {
  build() {
    const logo = document.getElementById('logo');
    const image = `<svg viewBox="0 0 24 24" style="width: 2.5rem"> <path d="${mdiSpotify}"></path> </svg>`;
    logo.insertAdjacentHTML('afterbegin', image);
  },
};
