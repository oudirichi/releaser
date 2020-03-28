const { executeCommand } = require('../utils');

module.exports = {
  name: 'remote',

  configuration() {
    return {
      type: 'input',
      message: 'Which remote you want to push (ex: origin, upstream)?',
    };
  },

  condition(_config) {
    return true;
  },

  handle(config, options = {}) {

  }
}
