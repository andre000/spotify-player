import axios from 'axios';
import env from './config';

class SpotifyWrapper {
  constructor({ token }) {
    this.token = token;
    this.createInstance();
  }

  createInstance() {
    this.instance = axios.create({
      baseURL: env.SPOTIFY_ENDPOINT,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async search(query, type) {
    const { data: result } = await this.instance.get('search', {
      params: {
        q: query,
        type,
      },
    });

    return result;
  }

  async getAlbumDetail(albumID, withTracks = false) {
    const { data: result } = await this.instance
      .get(`albums/${albumID}${withTracks ? '/tracks' : ''}`);

    return result;
  }

  static generateToken() {
    const authURL = `${env.SPOTIFY_AUTH_REQUEST}?client_id=${env.SPOTIFY_CLIENT_ID}&redirect_uri=${env.APP_TOKEN_REDIRECT}&response_type=token`;
    return authURL;
  }
}

export default SpotifyWrapper;
