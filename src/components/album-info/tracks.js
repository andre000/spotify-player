export default {
  build() {},
  template: ({
    id, number, title, duration,
  }) => `<div class='music' data-id='${id}'>
       <p class="music-number">${number}</p>
       <p class="music-title">${title}</p>
       <p class="music-duration">${duration}</p>
     </div>`,
};
