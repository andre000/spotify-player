/* global document */
import aside from './index';
import list from './list';
import search from './search';

describe('Aside Component', () => {
  const rList = list;
  const rSearch = search;

  beforeEach(() => {
    list.build = jest.fn();
    search.build = jest.fn();
  });

  afterAll(() => {
    list = rList;
    search = rSearch;
  });

  it('should exist and have an build function', () => {
    expect(aside).toBeTruthy();
    expect(typeof aside.build).toBe('function');
  });

  it('should call auxiliaries functions when build', () => {
    document.body.innerHTML = '<div id="logo"></div><div class="search-icon"></div>';
    aside.build();
    expect(list.build.mock.calls.length).toBe(1);
  });

  it('should be able to create a logo', () => {
    document.body.innerHTML = '<div id="logo"></div>';
    aside.createLogo();
    expect(document.querySelectorAll('svg').length).toBe(1);
    expect(document.querySelector('svg').innerHTML).toMatch(/path/);
  });

  it('should be able to create the search icon', () => {
    document.body.innerHTML = '<div class="search-icon"></div>';
    aside.createSearchIcon();
    expect(document.querySelectorAll('svg').length).toBe(1);
    expect(document.querySelector('svg').innerHTML).toMatch(/path/);
  });

  it('should remove the closed classes when clicking on the component', () => {
    document.body.innerHTML = '<aside class="section hero is-primary is-bold closed"></aside><main class="section"></div>';
    aside.eventReopen();
    const asideDOM = document.querySelector('aside.section');
    asideDOM.click();
    expect(asideDOM.classList.contains('closed')).toBeFalsy();
  });
});
