import max from './max';

/**
 * @param {String} url
 * @param {Object} data
 * @return {*}
 */
function getCurrentAction(url, data) {
  return max((x, y) => {
    let xFound = x.url && url.indexOf(x.url) > -1;
    let yNotFound = !!y.url || url.indexOf(y.url) === -1;
    let yFound = y.url && url.indexOf(y.url) > -1;

    return (xFound && yNotFound)
        || (xFound && yFound && x.url.length > y.url.length);
  }, data);
}

export default getCurrentAction;
