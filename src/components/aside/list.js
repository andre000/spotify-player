/* global document, window */
/* istanbul ignore file */
import { mdiAlbum } from '@mdi/js';
import albumInfo from '../album-info';

export default {
  build() {
    this.list = document.querySelector('.result-list');
    this.listenSearchResults();
    this.eventEndOfScroll();
  },

  generateList({ albums }, append = false) {
    this.nextPage = albums.next;
    this.albums = albums.items;

    const list = [...albums.items]
      .map(d => ({
        image: d.images[0] ? d.images[0].url : mdiAlbum,
        album: d.name,
        artist: d.artists[0].name,
      }));

    const html = list.reduce((t, d) => (t + this.template(d)), '');
    if (append) {
      document.querySelector('.result-list').insertAdjacentHTML('beforeend', html);
    } else {
      document.querySelector('.result-list').innerHTML = html;
    }

    const listEl = document.querySelectorAll('.list-item:not(.loaded)');
    this.albums.forEach((v, k) => {
      this.eventAlbumClick(listEl[k], v);
      listEl[k].classList.add('loaded');
    });
  },

  listenSearchResults() {
    this.list.addEventListener('search-results', (e) => {
      const { detail } = e;
      this.generateList(detail);
    });
  },

  eventAlbumClick(el, album) {
    el.addEventListener('click', () => {
      albumInfo.build(album);
      const aside = document.querySelector('aside.section');
      const main = document.querySelector('main.section');
      aside.classList.add('closed');
      main.classList.remove('closed');
    });
  },

  eventEndOfScroll() {
    this.list.addEventListener('scroll', async () => {
      const endOfScroll = (this.list.offsetHeight + this.list.scrollTop >= this.list.scrollHeight);
      if (endOfScroll && this.nextPage) {
        const url = new URL(this.nextPage);
        const offset = url.searchParams.get('offset');
        const limit = url.searchParams.get('limit');
        const query = url.searchParams.get('query');

        const detail = await window.spotify.search(query, 'album', offset, limit);
        this.generateList(detail, true);
      }
    });
  },

  template: ({
    image, album, artist,
  }) => `<div title='${album}' class='list-item'>
      ${image.match('http') ? `<img src='${image}' alt='${album}' class='list-image'/>`
    : `<svg viewBox="0 0 24 24" class='list-image'> <path d="${image}"></path> </svg>`}
      <div class='list-description'>
        <p class='list-title'>${album}</p>
        <p class='list-subtitle'>${artist}</p>
      </div>
     </div>`,
};
