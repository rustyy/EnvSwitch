/**
 * @link http://stackoverflow.com/a/105074
 * @returns {string}
 */
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

/**
 * @link http://stackoverflow.com/a/105074
 * @returns {string}
 */
function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

export default guid;
