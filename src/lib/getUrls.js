import getUrl from './getUrl';

/**
 * @param list
 * @return {*|Array}
 */
function getUrls(list) {
  return list.map(getUrl);
}

export default getUrls;
