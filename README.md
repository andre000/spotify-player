# Spotify Player

Small player using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/). 
You can see it working [here](https://andre000.github.io/spotify-player/).

Project made for an assingment on the [JS com TDD na Prática](https://www.udemy.com/js-com-tdd-na-pratica/learn/v4/overview) course.

It uses Webpack, Babel, SCSS, Jest, Bulma and Axios as main dependences.

Made with pure Javascript

## Configurations

Before running this project, copy the file `config.example.js`, rename it `config.js` and fill the fields with your data.


## Commands

### Install
Run the command: `npm install`

### Lint
Run the command: `npm run lint`

### Build 
Run the command: `npm run build`

### Watch Changes
Run the command: `npm run watch`

### Test
Run the command: `npm run test`

### Test w/ Watch
Run the command: `npm run test:tdd`


## Hooks

 - Pre-push: Check if test passes, lint errors and if coverage > 80%