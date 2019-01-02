/* global document, window */
/* istanbul ignore file */
import { mdiAlbum } from '@mdi/js';

export default {
  build() {
    this.list = document.querySelector('.result-list');
    this.listenSearchResults();
    this.eventEndOfScroll();
  },

  generateList({ albums }, append = false) {
    this.nextPage = albums.next;
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
  },

  listenSearchResults() {
    this.list.addEventListener('search-results', (e) => {
      const { detail } = e;
      this.generateList(detail);
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
