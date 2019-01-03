/* eslint-disable no-param-reassign */
/* global window, document */
export default {
  async build(albumID) {
    this.playing = null;
    this.result = await window.spotify.getAlbumDetail(albumID, true);
    this.tracks = this.result.items.map(d => ({
      id: d.id,
      number: d.track_number,
      title: d.name,
      duration: this.formatMiliseconds(d.duration_ms),
      preview: d.preview_url,
    }));

    this.container = document.querySelector('.track-container');
    const html = this.tracks.reduce((t, d) => {
      const h = t + this.template(d);
      return h;
    }, '');

    this.container.innerHTML = html;
    this.eventPreview();
  },

  eventPreview() {
    const tracks = document.querySelectorAll('.music');

    tracks.forEach((t) => {
      t.addEventListener('click', () => {
        const audio = t.children[3];

        /* istanbul ignore next */
        if (this.playing) {
          this.playing.pause();
        }

        this.playing = audio;

        /* istanbul ignore next */
        if (!this.playing.withEvents) {
          this.playing.withEvents = true;
          this.playing.onplay = () => {
            t.classList.add('playing');
          };

          t.children[2].original = t.children[2].innerText;
          this.playing.ontimeupdate = () => {
            t.children[2].innerText = Math.floor(this.playing.currentTime);
          };

          this.playing.onpause = () => {
            t.children[2].innerText = t.children[2].original;
            t.classList.remove('playing');
          };
        }

        /* istanbul ignore next */
        if (!t.classList.contains('playing')) {
          this.playing.play();
        } else {
          this.playing.pause();
        }
      });
    });
  },

  template: ({
    id, number, title, duration, preview,
  }) => `<div class='music' data-id='${id}'>
       <p class="music-number">${number}</p>
       <p class="music-title">${title}</p>
       <p class="music-duration">${duration}</p>
       <audio src='${preview}'></audio>
     </div>`,

  formatMiliseconds(ms) /* istanbul ignore next */ {
    let seconds = parseInt((ms / 1000) % 60, 10);
    let minutes = parseInt((ms / (1000 * 60)) % 60, 10);
    let hours = parseInt((ms / (1000 * 60 * 60)) % 24, 10);

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  },
};
