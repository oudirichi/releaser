#!/usr/bin/env node

/* global require, __dirname */

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const basePath = __dirname;
const configPath = path.resolve(basePath, 'config.json');
const { execSync } = require('child_process');
const pkgPath = path.resolve(process.cwd(), 'package.json');

const writeJsonToFile = (file, content) => {
  const packageJsonIndent = 2;
  fs.writeFileSync(file, JSON.stringify(content, null, packageJsonIndent), 'utf8');
}

let config;

try {
  config = require(configPath);
} catch (error) {
  config = {};
}

let packageJson;
try {
  packageJson = require(pkgPath);
} catch (error) {
  console.log(`Current Folder (${pkgPath}) does not contain a package.json file`);
}

const { name, version } = packageJson;
const release = async () => {
  if (!config[name]) {
    const result = await inquirer
      .prompt([
        {
          name: 'action',
          type: 'list',
          message: `Target directory already exists. Pick an action:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Merge', value: 'merge' },
            { name: 'Cancel', value: false }
          ]
        },
        {
          name: 'commit',
          type: 'confirm',
          message: 'Committing package.json and package-lock.json to master?',
          default: false
        },
        {
          type: 'input',
          name: 'command',
          message: 'Which command to execute for build?',
        },
        {
          type: 'input',
          name: 'forceAdd',
          message: 'Which folder do you want to force add?',
        },
        {
          name: 'createTag',
          type: 'confirm',
          message: 'do you want to create tag?',
          default: false
        },
        {
          name: 'releaseNpm',
          type: 'confirm',
          message: 'do you want to release to npm?',
          default: false
        },
        {
          type: 'input',
          name: 'remote',
          message: 'Which remote you want to push (ex: origin, upstream)?',
        },
      ]);

    config[name] = result;
    writeJsonToFile(configPath, config);
  }

  console.log(`Current package: ${name} - ${version}`);
  const answers = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'version',
        message: 'Which version you want to release (ex: 1.0.0)?',
      },
    ]);

  packageJson.version = answers.version;
  const remote = config[name].remote;

  writeJsonToFile(pkgPath, packageJson);

  execSync(`npm install`);

  if (config[name].commit) {
    execSync(`git commit -am "release ${answers.version}" && git push ${remote} HEAD:master`);
  };

  if (config[name].command) {
    execSync(`npm run ${answers.command}`);
  };

  if (config[name].forceAdd) {
    execSync(`git add -f ${forceAdd}`);
  };

  execSync(`git commit -m "build and release ${answers.version}"`);

  if (config[name].createTag) {
    execSync(`git tag ${answers.version} && git push ${remote} ${answers.version}`);
  };

  if (config[name].releaseNpm) {
    execSync(`npm publish`);
  };
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})
