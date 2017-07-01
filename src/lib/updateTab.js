import state from './state';
import getTabUrl from './getTabUrl';
import getPath from './getPath';

/**
 * @param {string} url
 * @param {boolean} newTab
 */
function updateTab(url, newTab) {
  getTabUrl((currentUrl) => {
    let fn = (newTab === 'true') ? chrome.tabs.create : chrome.tabs.update;
    fn({url: url + getPath(currentUrl, state.configurations)});
  });
}

export default updateTab;
