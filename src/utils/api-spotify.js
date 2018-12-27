import axios from 'axios';

require('dotenv').config();

class SpotifyWrapper {
  constructor({ token }) {
    this.token = token;
    this.createInstance();
  }

  createInstance() {
    this.instance = axios.create({
      baseURL: process.env.SPOTIFY_ENDPOINT,
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

  static async generateToken() {
    const token = await new Promise(resolve => setTimeout(() => { resolve('foo'); }, 100));
    return token;
  }
}

export default SpotifyWrapper;
