import createConfigNode from './createConfigNode';

/**
 * Show configurations.
 */
function showConfigs() {
  chrome.storage.local.get((data) => {
    let fragment = new DocumentFragment();
    let cf = createConfigNode;
    let configListEl = document.querySelector('.configuration-list');

    Object.values(data).forEach((p1) => fragment.appendChild(cf(p1)));
    configListEl.innerHTML = '';
    if (fragment.children.length > 0) configListEl.appendChild(fragment);
  });
}

export default showConfigs;
