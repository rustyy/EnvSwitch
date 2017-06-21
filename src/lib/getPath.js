import urlsFromConfigurations from './urlsFromConfigurations';
import max from './max';

/**
 * @param {String} url
 * @param {Object[]} configurations
 * @return {String}
 */
function getPath(url, configurations) {
  let candidate;
  let urls = urlsFromConfigurations(configurations).
      filter((u) => url.indexOf(u) > -1);

  if (candidate = max((x, y) => x > y, urls)) {
    return url.replace(candidate, '');
  } else {
    return url.replace(/(.*:*\/\/[^\/]+)/g, '');
  }
}

export default getPath;
