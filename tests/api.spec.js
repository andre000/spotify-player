import axios from 'axios';
import SpotifyWrapper from '../src/utils/api-spotify';

describe('Spotify API Wrapper', () => {
  describe('Smoke Test', () => {
    it('should have an Spotify Wrapper Class', () => {
      expect(SpotifyWrapper).toBeTruthy();
      expect(() => {
        // eslint-disable-next-line no-new
        new SpotifyWrapper();
      }).not.toThrow(/is not a constructor/);
    });
  });

  it('should have a token propriety after construction', () => {
    const sfy = new SpotifyWrapper({
      token: 'foo',
    });

    expect(sfy.token).toBeTruthy();
  });

  it('should have a token generator function when user doesn\'t have one', async () => {
    const spy = jest.spyOn(SpotifyWrapper, 'generateToken');
    const token = await SpotifyWrapper.generateToken();
    const sfy = new SpotifyWrapper({ token });

    expect(spy).toHaveBeenCalled();
    expect(sfy.token).toBeTruthy();
    spy.mockRestore();
  });

  it('should have an created axios instance with the URL to the API', () => {
    const spy = jest.spyOn(axios, 'create');
    const sfy = new SpotifyWrapper({ token: 'foo' });
    expect(sfy.instance).toBeTruthy();
    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://api.spotify.com/v1/search',
      headers: { Authorization: 'Bearer foo' },
    });
    spy.mockRestore();
  });

  describe('Search Function', () => {
    it('should be a function', () => {
      const sfy = new SpotifyWrapper({ token: 'foo' });
      expect(typeof sfy.search).toBe('function');
    });

    it('should return a promise with the correct parameters', async () => {
      const sfy = new SpotifyWrapper({ token: 'foo' });
      const spy = jest.spyOn(sfy.instance, 'get')
        .mockImplementation(() => new Promise(resolve => resolve({ data: { foo: 'bar' } })));
      const result = await sfy.search('Mother Mother', 'artist');

      expect(result).toEqual({ foo: 'bar' });
      expect(spy).toHaveBeenCalledWith('search', {
        params: {
          q: 'Mother Mother',
          type: 'artist',
        },
      });

      spy.mockRestore();
    });
  });

  describe('Get Album Detail', () => {
    it('should be a funciton', () => {
      const sfy = new SpotifyWrapper({ token: 'foo' });
      expect(typeof sfy.getAlbumDetail).toBe('function');
    });

    it('should return a promise with the correct parameters', async () => {
      const sfy = new SpotifyWrapper({ token: 'foo' });
      const spy = jest.spyOn(sfy.instance, 'get')
        .mockImplementation(() => new Promise(resolve => resolve({ data: { foo: 'bar' } })));
      const result = await sfy.getAlbumDetail('0sNOF9WDwhWunNAHPD3Baj');

      expect(result).toEqual({ foo: 'bar' });
      expect(spy).toHaveBeenCalledWith('albums/0sNOF9WDwhWunNAHPD3Baj');

      spy.mockRestore();
    });

    it('should return a promise with the correct parameters when `withTracks` option is true', async () => {
      const sfy = new SpotifyWrapper({ token: 'foo' });
      const spy = jest.spyOn(sfy.instance, 'get')
        .mockImplementation(() => new Promise(resolve => resolve({ data: { foo: 'bar' } })));
      const result = await sfy.getAlbumDetail('0sNOF9WDwhWunNAHPD3Baj', true);

      expect(result).toEqual({ foo: 'bar' });
      expect(spy).toHaveBeenCalledWith('albums/0sNOF9WDwhWunNAHPD3Baj/tracks');

      spy.mockRestore();
    });
  });
});
