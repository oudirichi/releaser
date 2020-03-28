const { executeCommand } = require('../utils');

module.exports = {
  name: 'releaseNpm',

  configuration() {
    return {
      type: 'confirm',
      message: 'do you want to release to npm?',
      default: false
    };
  },

  condition(config) {
    return !!config.releaseNpm;
  },

  handle(config, options = {}) {
    executeCommand('npm publish', options);
  }
}
