import getUrls from './getUrls';

/**
 * @param {Array} data
 * @return {Array}
 */
function urlsFromConfigurations(data) {
  return data.reduce((urls, {actions}) => {
    urls.push(...getUrls(actions));
    return urls;
  }, []);
}

export default urlsFromConfigurations;
