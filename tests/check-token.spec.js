import SpotifyWrapper from '../src/utils/api-spotify';
import checkToken from '../src/utils/check-token';

const { location, localStorage } = global;

describe('Check Token function', () => {
  it('should redirect to Spotify Auth when doesn\'t find a token', () => {
    Object.defineProperty(global, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:8000',
        replace: jest.fn(),
      },
    });

    checkToken.start();
    expect(global.location.replace.mock.calls[0][0])
      .toBe(SpotifyWrapper.generateToken());

    global.location = location;
  });

  it('should save the token when sucessifully redirected', () => {
    const mockLocal = {};
    Object.defineProperty(global, 'localStorage', {
      writable: true,
      value: {
        getItem: jest.fn(key => mockLocal[key]),
        setItem: jest.fn((key, value) => {
          mockLocal[key] = value;
        }),
      },
    });

    Object.defineProperty(global, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:8000#access_token=foo&expires_in=3600',
        replace: jest.fn(),
      },
    });

    const token = checkToken.start();
    expect(token).toBe('foo');
    expect(global.localStorage.setItem.mock.calls[0]).toEqual(['token', 'foo']);
    expect(global.localStorage.setItem.mock.calls[1]).toEqual(['expires_in', '3600']);

    global.location = location;
    global.localStorage = localStorage;
  });

  it('should return the token if it\'s already saved', () => {
    const mockLocal = {
      token: 'foo',
      expires_in: '3600',
    };

    Object.defineProperty(global, 'localStorage', {
      writable: true,
      value: {
        getItem: jest.fn(key => mockLocal[key]),
        setItem: jest.fn((key, value) => {
          mockLocal[key] = value;
        }),
      },
    });

    Object.defineProperty(global, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:8000',
        replace: jest.fn(),
      },
    });

    const token = checkToken.start();
    expect(token).toBe('foo');
    expect(global.localStorage.setItem.mock.calls).toEqual([]);
    expect(global.location.replace.mock.calls).toEqual([]);
  });

  it('should renew the token when invalid', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 1);

    let mockLocal = {
      token: 'foo',
      expires_in: '3600',
      expire_date: oldDate,
    };

    Object.defineProperty(global, 'localStorage', {
      writable: true,
      value: {
        getItem: jest.fn(key => mockLocal[key]),
        setItem: jest.fn((key, value) => {
          mockLocal[key] = value;
        }),
        clear: jest.fn(() => {
          mockLocal = {};
        }),
      },
    });

    Object.defineProperty(global, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:8000',
        replace: jest.fn(),
      },
    });

    checkToken.start();
    expect(global.localStorage.clear.mock.calls.length).toBe(1);
    expect(global.location.replace.mock.calls.length).toBe(1);
  });

  it('should return an error when the Spotify Auth returns with an error', () => {
    Object.defineProperty(global, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:8000?error=access_denied?&state=403',
        replace: jest.fn(),
      },
    });

    expect(() => {
      checkToken.start();
    }).toThrow();

    global.location = location;
  });
});
