/* global window */
import SpotifyWrapper from './api-spotify';
import env from './config';

export default {
  start() {
    const url = new URL(window.location.href);
    if (url.searchParams.get('error')) {
      throw new Error(url.searchParams.get('error'));
    }

    if (url.hash.match(/access_token/)) {
      const params = new URLSearchParams(url.hash.substr(1));
      window.localStorage.setItem('token', params.get('access_token'));
      window.localStorage.setItem('expires_in', params.get('expires_in'));

      const tokenDate = new Date();
      tokenDate.setSeconds(tokenDate.getSeconds() + parseInt(params.get('expires_in'), 10));
      window.localStorage.setItem('expire_date', tokenDate);
      window.location.replace(env.APP_TOKEN_REDIRECT);
    }

    const token = window.localStorage.getItem('token');
    if (!token) {
      const authURL = SpotifyWrapper.generateToken();
      return window.location.replace(authURL);
    }

    const now = new Date();
    if (now >= new Date(window.localStorage.getItem('expire_date'))) {
      window.localStorage.clear();
      this.start();
    }

    return token;
  },
};
