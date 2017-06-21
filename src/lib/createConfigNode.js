/**
 * @param {Object} data
 * @return {Element}
 */
function createConfigNode(data) {
  let node = document.createElement('div');
  let prettyJson = document.createElement('pre');
  let header = document.createElement('div');
  let configName = document.createElement('h3');
  let deleteButton = document.createElement('div');

  deleteButton.textContent = 'delete';
  deleteButton.classList.add('configuration__delete', 'btn', 'btn--warn');
  deleteButton.setAttribute('data-name', data.name);

  configName.textContent = data.name;
  configName.classList.add('configuration__name');

  header.classList.add('configuration__header');
  header.appendChild(configName);
  header.appendChild(deleteButton);

  prettyJson.textContent = JSON.stringify(data, null, 2);
  // prettyJson.setAttribute('contentEditable', true);
  prettyJson.classList.add('configuration__json');

  node.classList.add('configuration');
  node.appendChild(header);
  node.appendChild(prettyJson);

  return node;
}

export default createConfigNode;
