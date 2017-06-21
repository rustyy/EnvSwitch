/**
 * @param {Object[]} list
 * @return {String[]}
 */
function getGroups(list) {
  return list.map((x) => x.group).filter((i, p, s) => s.indexOf(i) === p);
}

export default getGroups;
