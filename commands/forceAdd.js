const { execSync } = require('child_process');
const { executeCommand } = require('../utils');

module.exports = {
  name: 'forceAdd',

  configuration() {
    return {
      type: 'input',
      message: 'Which folder do you want to force add?',
    };
  },

  condition(config) {
    return !!config.forceAdd;
  },

  handle(config, options = {}) {
    executeCommand(`git add -f ${config.forceAdd}`, options);
  }
}
