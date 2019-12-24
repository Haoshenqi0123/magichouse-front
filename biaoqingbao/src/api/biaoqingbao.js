import fetch from './fetch.js'

export function getImgLists(key) {
    return fetch({
      url: '/search',
      method: 'get',
      params: {
        key
      }
    });
  }