#!/usr/bin/env node

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

  // packageJson.version = answers.version;
  // writeJsonToFile(pkgPath, packageJson);

  commands.forEach((command) => {
    if (command.condition(config)) {
      command.handle({ ...config, version: answers.version, pkgPath, packageJson }, {
        verbose,
        dryRun,
      });
    }
  });

  // if (config[name].commit) {
  //   execSync(`git commit -am "release ${answers.version}" && git push ${remote} HEAD:master`);
  // };

  // if (config[name].command) {
  //   execSync(answers.command);
  // };

  // if (config[name].forceAdd) {
  //   execSync(`git add -f ${forceAdd}`);
  // };

  // execSync(`git commit -m "build and release ${answers.version}"`);

  // if (config[name].createTag) {
  //   execSync(`git tag ${answers.version} && git push ${remote} ${answers.version}`);
  // };

  // if (config[name].releaseNpm) {
  //   execSync(`npm publish`);
  // };
}

module.exports = release;
