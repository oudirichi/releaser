const { executeCommand } = require('../utils');

module.exports = {
  name: 'npmInstall',

  configuration() {
    return {
      type: 'confirm',
      message: 'make a npm install?',
      default: true,
    }
  },

  condition(config) {
    return !!config.npmInstall;
  },

  handle(config, options = {}) {
    executeCommand('npm install', options);
  }
}
