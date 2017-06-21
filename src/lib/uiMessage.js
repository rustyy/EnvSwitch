const visibleClassName = 'message--is-visible';

/**
 * @param {String} type
 * @param {String} text
 */
export default function showMessage(type, text) {
  let message = document.querySelector('.message');
  let types = {
    'success': 'message--success',
    'error': 'message--error',
  };

  message.textContent = text;
  message.classList.add(visibleClassName, types[type]);
  hideMessage();
}

/**
 * Hides message container.
 */
export function hideMessage() {
  let message = document.querySelector('.message');
  let transDuration = window.getComputedStyle(message).transitionDuration;
  let messageTransitionDuration = parseFloat(transDuration) * 1000;

  setTimeout(() => {
    message.classList.remove(visibleClassName);
  }, messageTransitionDuration + 1500);
}
