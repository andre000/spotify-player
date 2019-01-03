/* global document */
import { mdiLibraryMusic, mdiAlbum } from '@mdi/js';
import albumTracks from './tracks';

export default {
  build(album) {
    this.album = {
      image: album.images[0] ? album.images[0].url : mdiAlbum,
      album: album.name,
      artist: album.artists[0].name,
      id: album.id,
      tracks: album.total_tracks,
    };

    this.container = document.querySelector('.album-container');
    this.container.innerHTML = this.templateAlbum(this.album);
    albumTracks.build(this.album.id);
  },

  templateAlbum: ({
    image, album, artist, tracks,
  }) => `<div class='album-info'>
  ${image.match('http') ? `<img src='${image}' alt='${album}' class='album-image card card-content'/>`
    : `<svg viewBox="0 0 24 24" class='album-image card card-content'> <path d="${image}"></path> </svg>`}
      <p class="album-title has-text-primary">${album}</p>
      <p class="album-artist">${artist}</p>
      <p class="album-counter">
        <svg viewBox='0 0 24 24' style='height: 16px'><path d='${mdiLibraryMusic}'></path></svg>
        ${tracks}
      </p>
     </div>`,
};
