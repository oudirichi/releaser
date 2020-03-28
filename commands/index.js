const commit = require('./commit');
const buildCommand = require('./buildCommand');
const createTag = require('./createTag');
const forceAdd = require('./forceAdd');
const lastCommit = require('./lastCommit');
const npmInstall = require('./npmInstall');
const releaseNpm = require('./releaseNpm');
const remote = require('./remote');
const saveVersion = require('./saveVersion');

module.exports = [
  remote,

  npmInstall,
  saveVersion,
  commit,

  buildCommand,
  forceAdd,
  lastCommit,

  createTag,
  releaseNpm,
]
