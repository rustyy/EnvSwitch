/**
 * @param {String} url
 * @param {Object[]} data
 * @return {Object}
 */
function getCurrentProject(url, data) {
  let cb = (result, item) => result || url.indexOf(item.url) > -1;
  return data.filter((item) => item.actions.reduce(cb, false)).pop();
}

export default getCurrentProject;
