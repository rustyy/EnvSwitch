import readFile from './lib/readFile';
import dataToStorage from './lib/dataToStorage';
import showConfigs from './lib/uiShowConfigs';

let inputButton = document.querySelector('.import__input');
inputButton.addEventListener('change', (e) => {
  let file = e.target.files[0];
  readFile(file, dataToStorage);
  inputButton.value = '';
}, false);

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.classList.contains('configuration__delete')) {
    chrome.storage.local.remove(e.target.getAttribute('data-name'));
  }
});

window.onload = showConfigs;
chrome.storage.onChanged.addListener(showConfigs);
