import guid from './guid';

/**
 * @param {object} config
 * @return {*}
 */
function mapConfiguration(config) {
  config.guid = guid();
  config.actions = config.actions.map((action) => {
    action.guid = guid();
    return action;
  });
  return config;
}

export default mapConfiguration;
