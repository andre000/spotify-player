/* global document, HTMLMediaElement */
import albumInfo from './index';
import albumTracks from './tracks';

const mkAlbum = {
  artists: [{
    name: 'TK from Ling tosite sigure',
  }],
  id: '3ur0aoe8AKjK3iofS1erhZ',
  images: [{
    height: 640,
    url: 'https://i.scdn.co/image/5dc174970ad63fcc573df30d9beb357eb1fd48c8',
    width: 640,
  }],
  name: 'Unravel',
  total_tracks: 3,
};

const mkAlbumNoImage = {
  artists: [{
    name: 'TK from Ling tosite sigure',
  }],
  id: '3ur0aoe8AKjK3iofS1erhZ',
  images: [],
  name: 'Unravel',
  total_tracks: 3,
};

const mkTracks = {
  href: 'https://api.spotify.com/v1/albums/3ur0aoe8AKjK3iofS1erhZ/tracks?offset=0&limit=20',
  items: [
    {
      id: '6Pz0u5ItrGIwkKr0Z7S93H',
      name: 'Unravel',
      preview_url: 'https://p.scdn.co/mp3-preview/7b56a38dfc7ae953db793b2dfd4ec110828a0455?cid=f0478b4323fd4137ba6d59e89123c210',
      track_number: 1,
      duration_ms: 4000,
    },
    {
      id: '6R9XkXK1S1o6QighDx5MgC',
      name: 'Furetefureru',
      preview_url: 'https://p.scdn.co/mp3-preview/2dd5a270b53dd92750b7c094e009035d268b4275?cid=f0478b4323fd4137ba6d59e89123c210',
      track_number: 2,
      duration_ms: 4000,
    },
    {
      id: '0gXeWUxgRWmnpFCcIsi3Bh',
      is_local: false,
      name: 'Acoustic Installation',
      preview_url: 'https://p.scdn.co/mp3-preview/747794eb96a281348f24eb6e1586738416979540?cid=f0478b4323fd4137ba6d59e89123c210',
      track_number: 3,
      duration_ms: 4000,
    },
  ],
  limit: 20,
  next: null,
  offset: 0,
  previous: null,
  total: 3,
};

global.spotify = {
  getAlbumDetail: jest.fn(() => (mkTracks)),
};

describe('Album Info Builder', () => {
  let mkAlbumInfo;
  beforeAll(() => {
    mkAlbumInfo = { ...albumInfo };
    document.body.innerHTML = '<div class="album-container"></div><div class="track-container"></div>';
  });

  it('should have mapped the given album propriety to inner variable', () => {
    mkAlbumInfo.build(mkAlbum);
    expect(mkAlbumInfo.album.id).toBe(mkAlbum.id);
  });
  it('should have successfully build the template with the given album', () => {
    mkAlbumInfo.build(mkAlbum);
    expect(document.body.innerHTML).toMatch(/album-info/);
  });
  it('should have an SVG when an album doesn\'t have an image', () => {
    mkAlbumInfo.build(mkAlbumNoImage);
    expect(document.body.innerHTML).toMatch(/svg/);
  });
});

describe('Album Tracks Builder', () => {
  let mkAlbumTracks;
  beforeEach(() => {
    mkAlbumTracks = { ...albumTracks };
    document.body.innerHTML = '<div class="album-container"></div><div class="track-container"></div>';

    HTMLMediaElement.prototype.play = jest.fn(() => {
      mkAlbumTracks.playing.onplay();
      mkAlbumTracks.playing.ontimeupdate();
    });
    HTMLMediaElement.prototype.pause = jest.fn(() => {
      mkAlbumTracks.playing.onpause();
    });
  });

  it('should have mapped the given album propriety to inner variable', async () => {
    await mkAlbumTracks.build(mkTracks.id);
    expect(mkAlbumTracks.tracks.id).toBe(mkTracks.id);
  });
  it('should have successfully build the template with the tracks', async () => {
    await mkAlbumTracks.build(mkTracks.id);
    const tracks = document.querySelectorAll('.music');
    expect(tracks.length).toBe(3);
  });
  it('should add the `playing` class when clicking on the track', async () => {
    await mkAlbumTracks.build(mkTracks.id);
    const music = document.querySelector('.music');
    music.click();
    expect(music.classList.contains('playing')).toBeTruthy();
  });
  it('should remove the `playing` class if paused', async () => {
    await mkAlbumTracks.build(mkTracks.id);
    const music = document.querySelector('.music');
    music.click();
    mkAlbumTracks.playing.onpause();
    expect(music.classList.contains('playing')).toBeFalsy();
  });
});
