const { writeFileSync } = require('fs');
const { execSync } = require('child_process');

const executeCommand = (command, { dryRun, verbose } = {}) => {
  if (verbose) console.log(`executing command: '${command}'`);
  if (!dryRun) execSync(command);
}

const writeJsonToFile = (file, content, { dryRun, verbose } = {}) => {
  const packageJsonIndent = 2;
  if (verbose) console.log(`saving to file ${file}`);
  if (!dryRun) writeFileSync(file, JSON.stringify(content, null, packageJsonIndent), 'utf8');
}

const loadPackageJson = (pkgPath) => {
  let packageJson;
  try {
    packageJson = require(pkgPath);
  } catch (error) {
    console.error(`Current Folder (${pkgPath}) does not contain a package.json file`);
    process.exit(1);
  }
  return packageJson;
};


module.exports = {
  executeCommand,
  writeJsonToFile,
  loadPackageJson,
}
