const { writeJsonToFile } = require('../utils');
module.exports = {
  name: 'saveVersion',

  configuration() {
    return {
      type: 'confirm',
      message: 'save the version you release in package.json?',
      default: true,
    }
  },

  condition(config) {
    return !!config.saveVersion;
  },

  handle(config, options = {}) {
    config.packageJson.version = config.version;
    writeJsonToFile(config.pkgPath, config.packageJson, options);
  }
}
