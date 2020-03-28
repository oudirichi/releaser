const { executeCommand } = require('../utils');

module.exports = {
  name: 'createTag',

  configuration() {
    return {
      type: 'confirm',
      message: 'do you want to create tag?',
      default: true
    };
  },

  condition(config) {
    return !!config.createTag;
  },

  handle(config, options = {}) {
    executeCommand(`git tag ${config.version} && git push ${config.remote} ${config.version}`, options);
  }
}
