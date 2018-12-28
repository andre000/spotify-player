/* global document */
export default {
  build() /* istanbul ignore next */ {
    this.list = document.querySelector('.result-list');
    this.list.addEventListener('search-results', (e) => {
      const { detail } = e;
      this.generateList(detail);
    });
  },

  generateList({ albums }) /* istanbul ignore next */ {
    const list = [...albums.items]
      .map(d => ({
        image: d.images[0] ? d.images[0].url : '',
        album: d.name,
        artist: d.artists[0].name,
      }));

    const html = list.reduce((t, d) => (t + this.template(d)), '');
    document.querySelector('.result-list').innerHTML = html;
  },

  template: /* istanbul ignore next */ ({
    image, album, artist,
  }) => `<div class='list-item'>
      <img src='${image}' alt='${album}' class='list-image'/>
      <div class='list-description'>
        <p class='list-title'>${album}</p>
        <p class='list-subtitle'>${artist}</p>
      </div>
     </div>`,
};
