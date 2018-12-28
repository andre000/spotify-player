/* global window */
import './assets/base.scss';
import './assets/index.scss';

import aside from './components/aside';
import checkToken from './utils/check-token';
import SpotifyWrapper from './utils/api-spotify';

const token = checkToken.start();
window.spotify = new SpotifyWrapper({ token });

aside.build();
