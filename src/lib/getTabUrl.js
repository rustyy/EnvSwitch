/**
 * Returns current tab-url to the given callback.
 * @param {function} callback
 */
function getTabUrl(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, (data) => {
    callback(data[0].url);
  });
}

export default getTabUrl;
