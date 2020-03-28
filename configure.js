const inquirer = require('inquirer');
const homedir = require('os').homedir();

const path = require('path');
const { writeJsonToFile } = require('./utils');
const globalConfigPath = path.resolve(homedir, 'releaser.json');
const localConfigPath = path.resolve(process.cwd(), 'releaser.json');
const commands = require('./commands/index');

const questionsConfiguration = async (config = {}) => {
  const result = await inquirer
    .prompt(
      commands.reduce((acc, command) => {
        if (command.configurable !== false) acc.push({ name: command.name, ...command.configuration() });
        return acc;
     }, [])
    );

  config = { ...config, ...result };
  return config;
}

const loadGlobalConfig = (appName) => {
  let config;

  try {
    const allConfig = require(globalConfigPath);
    config = allConfig[appName];
  } catch (_error) {
    config = undefined;
  }

  return config;
}

const saveGlobalConfig = (config, appName) => {
  let globalConfig;

  try {
    globalConfig = require(globalConfigPath);
  } catch (_error) {
    globalConfig = {};
  }

  globalConfig[appName] = config;
  writeJsonToFile(globalConfigPath, globalConfig);
}

const loadLocalConfig = () => {
  let config;
  try {
    config = require(localConfigPath);
  } catch (_error) {
    config = undefined;
  }

  return config;
}

const saveLocalConfig = (config) => {
  writeJsonToFile(localConfigPath, config);
}

const loadCurrentAppConfig = (appName) => {
  return loadLocalConfig() || loadGlobalConfig(appName);
}


module.exports = {
  questionsConfiguration,
  loadCurrentAppConfig,
  saveLocalConfig,
  saveGlobalConfig,
}
