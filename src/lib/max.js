/**
 * @param {function} fn
 * @param {Array} list
 * @return {*}
 */
function max(fn, list) {
  return list.reduce((x, y) => {
    return fn(x, y) ? x : y;
  }, false);
}

export default max;
