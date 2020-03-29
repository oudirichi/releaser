/* global require, __dirname */
const path = require('path');
const pkgPath = path.resolve(process.cwd(), 'package.json');
const releaserConfig = require(path.resolve(__dirname, 'package.json'));

const inquirer = require('inquirer');

const commands = require('./commands/index');

const {
  questionsConfiguration,
  loadCurrentAppConfig,
  saveLocalConfig,
  saveGlobalConfig,
 } = require('./configure');

const { loadPackageJson } = require('./utils');

const release = async ({
  verbose,
  dryRun,
  reconfigure,
  global: saveGlobal,
} = {}) => {
  const packageJson = loadPackageJson(pkgPath);
  let config = loadCurrentAppConfig();

  if (!config || reconfigure) {
    config = await questionsConfiguration(config);
    config = { version: releaserConfig.version, ...config};

    if (saveGlobal) {
      saveGlobalConfig(config, packageJson.name);
    } else {
      saveLocalConfig(config);
    }
  }

  console.log(`Current package: ${packageJson.name} - ${packageJson.version}`);
  const answers = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'version',
        message: 'Which version you want to release (ex: 1.0.0)?',
      },
    ]);

  commands.forEach((command) => {
    if (command.condition(config)) {
      command.handle({ ...config, version: answers.version, pkgPath, packageJson }, {
        verbose,
        dryRun,
      });
    }
  });
}

module.exports = release;
