import state from './lib/state';
import getTabUrl from './lib/getTabUrl';
import mapConfiguration from './lib/mapConfiguration';
import updateTab from './lib/updateTab';
import popupUi from './lib/popupUi';

/**
 * @param {object} data
 */
function setup(data) {
  state.configurations = Object.values(data).map(mapConfiguration);
  getTabUrl((url) => state.update(url, popupUi.render));
}

// Run setup.
document.addEventListener('DOMContentLoaded', chrome.storage.local.get(setup));

// Re-render action-list on selection change.
document.querySelector('body').addEventListener('change', (e) => {
  if (e.target.classList.contains('project-picker')) {
    popupUi.renderActionList(e.target.value);
  }
});

// Handle button clicks.
document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.classList.contains('action') &&
      !e.target.classList.contains('btn--primary-disabled')) {
    popupUi.setActiveAction(e.target);
    updateTab(e.target.getAttribute('data-url'),
        e.target.getAttribute('data-new-tab'));
  }
});

// Update state on tab updates.
chrome.tabs.onUpdated.addListener((tid, changeInfo, tab) => {
  if (tab.active && tab.status === 'loading') {
    state.update(tab.url, popupUi.render);
  }
});
