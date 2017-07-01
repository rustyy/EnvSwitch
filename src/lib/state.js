import getCurrentAction from './getCurrentAction';
import getCurrentProject from './getCurrentProject';

let state = {
  configurations: [],
  currentProject: {},
  currentAction: {},
  getCurrentProjectGuid: () => {
    return state.currentProject && state.currentProject.guid || false;
  },
  update: (url, callback) => {
    state.currentProject = getCurrentProject(url, state.configurations);
    state.currentAction = state.currentProject &&
        getCurrentAction(url, state.currentProject.actions);
    callback && callback();
  },
};

export default state;
