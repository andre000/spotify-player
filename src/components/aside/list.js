export default {
  build() {},
  template: ({
    image, album, artist,
  }) => `<div class='list-item'>
      <img src='${image}' alt='${album}' class='list-image'/>
      <div class='list-description'>
        <p class='list-title'>${album}</p>
        <p class='list-suvtitle'>${artist}</p>
      </div>
     </div>`,
};
