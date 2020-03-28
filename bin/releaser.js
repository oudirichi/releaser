const path = require('path');
const { program } = require('commander');
const config = path.resolve(__dirname, '..', 'package.json');
const releaser = require('../index');

program
  .name("releaser")
  .version(config.version)
  .description('configure only once your releasing information for your node app')
  .option("-d, --dry-run", "execute in dry-run to not execute all commands")
  .option("-v, --verbose", "display step")
  .option("-g, --global", "save the config to your home as releaser.json")
  .option("-l, --local", "save the releaser.json file on your application (default)")
  .option("-r, --reconfigure", 'force to reconfigure everthing');


program.parse(process.argv);
releaser(program).then(() => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
