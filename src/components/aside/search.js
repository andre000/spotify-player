/* global document, window, CustomEvent */

export default {
  build() /* istanbul ignore next */ {
    this.search = document.getElementById('search-input');
    this.search.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        await this.searchValue();
      }
    });
  },

  async searchValue() /* istanbul ignore next */ {
    this.result = await window.spotify.search(this.search.value, 'album');
    const list = document.querySelector('.result-list');

    window.searchEvent = new CustomEvent('search-results', { detail: this.result });
    list.dispatchEvent(window.searchEvent);
  },

};
