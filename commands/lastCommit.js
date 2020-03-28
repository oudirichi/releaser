const { executeCommand } = require('../utils');

module.exports = {
  configurable: false,

  condition(_config) {
    return true;
  },

  handle(config, options = {}) {
    executeCommand(`git commit -m "build and release ${config.version}"`, options);
  }
}
