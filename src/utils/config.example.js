const prod = {
  APP_TOKEN_REDIRECT: 'http://your-server-link',
  SPOTIFY_AUTH_REQUEST: 'https://accounts.spotify.com/authorize',
  SPOTIFY_CLIENT_ID: 'your-spotify-app-id',
  SPOTIFY_ENDPOINT: 'https://api.spotify.com/v1/',
};

const local = {
  APP_TOKEN_REDIRECT: 'http://your-server-link',
  SPOTIFY_AUTH_REQUEST: 'https://accounts.spotify.com/authorize',
  SPOTIFY_CLIENT_ID: 'your-spotify-app-id',
  SPOTIFY_ENDPOINT: 'https://api.spotify.com/v1/',
};

export default process.env.NODE_ENV === 'production' ? prod : local;
