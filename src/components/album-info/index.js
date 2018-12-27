export default {
  build() {},
  template: ({
    ìmage, album, artist, tracks,
  }) => `<div class='album-info'>
      <img src='${ìmage}' alt='${album}' class='album-image' />
      <p class="album-title">${album}</p>
      <p class="album-artist">${artist}</p>
      <p class="album-counter">${tracks.length}</p>
     </div>`,
};
