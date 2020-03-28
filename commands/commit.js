const { executeCommand } = require('../utils');

module.exports = {
  name: 'commit',

  configuration() {
    return {
      type: 'confirm',
      message: 'Committing package.json and package-lock.json to master?',
      default: true,
    }
  },

  condition(config) {
    return !!config.commit;
  },

  handle(config, options = {}) {
    executeCommand(`git commit -am "release ${config.version}" && git push ${config.remote} HEAD:master`, options);
  }
}
