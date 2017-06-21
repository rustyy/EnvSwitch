import showMessage from './uiMessage';

/**
 * @param {Object} data
 */
function dataToStorage(data) {
  let config = {};
  config[data.name] = data;

  chrome.storage.local.set(config, () => {
    showMessage('success', 'Configuration added successful');
  });
}

export default dataToStorage;
