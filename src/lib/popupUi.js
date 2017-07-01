import state from './state';
import getGroups from './getGroups';

function attachActionListItems(fragment, actions) {
  getGroups(actions).forEach((group) => {
    let node = document.createElement('div');
    node.classList.add('action-list__item');
    node.setAttribute('data-group', group);
    fragment.appendChild(node);
  });
}

function attachActions(fragment, actions) {
  actions.forEach((action) => {
    let a = document.createElement('div');
    a.classList.add('action', 'btn', 'btn--primary');
    a.textContent = action.name;
    a.setAttribute('data-new-tab', action.newTab.toString());
    a.setAttribute('data-url', action.url);
    a.setAttribute('data-id', action.guid);

    if (state.currentAction && action.guid === state.currentAction.guid) {
      a.classList.add('btn--primary-disabled');
    }
    fragment.querySelector('[data-group=' + action.group + ']').appendChild(a);
  });
}

const popupUi = {
  render: () => {
    popupUi.renderProjectPicker();
    popupUi.renderActionList();
  },
  setActiveAction: () => {
    Array.prototype.forEach.call(document.querySelectorAll('.action'),
        (item) => {
          if (state.currentAction &&
              item.getAttribute('data-id') === state.currentAction.guid) {
            item.classList.add('btn--primary-disabled');
            item.classList.remove('btn--primary');
          } else {
            item.classList.remove('btn--primary-disabled');
            item.classList.add('btn--primary');
          }
        });
  },
  renderActionList: (guid) => {
    let fragment = new DocumentFragment();
    let actionList = document.querySelector('.action-list');
    let currentProject = guid ?
        state.configurations.filter((x) => x.guid === guid).pop() :
        state.currentProject;
    let actions = currentProject && currentProject.actions || [];

    attachActionListItems(fragment, actions);
    attachActions(fragment, actions);

    actionList.innerHTML = '';
    actionList.appendChild(fragment);
  },
  renderProjectPicker: () => {
    let picker = document.querySelector('.project-picker');
    let fragment = new DocumentFragment();
    let empty = document.createElement('option');

    empty.textContent = '-----';
    empty.setAttribute('value', '-');
    fragment.appendChild(empty);

    state.configurations.forEach((item) => {
      let option = document.createElement('option');
      option.textContent = item.name;
      option.setAttribute('value', item.guid);
      fragment.appendChild(option);
    });

    picker.innerHTML = '';
    picker.appendChild(fragment);
    picker.value = state.getCurrentProjectGuid() || '-';
  },
};

export default popupUi;
