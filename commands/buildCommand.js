const { executeCommand } = require('../utils');

module.exports = {
  name: 'buildCommand',

  configuration() {
    return {
      type: 'input',
      message: 'Which command to execute for build?',
    };
  },

  condition(config) {
    return !!config.buildCommand;
  },

  handle(config, options = {}) {
    executeCommand(config.buildCommand, options);
  }
}
