const { program } = require('commander');

const { createCommand } = require('../lib/create-command');

program
  .action(createCommand.action)
  .allowUnknownOption()
  .description(createCommand.description);

// eslint-disable-next-line no-restricted-syntax
for (const [name, desc] of Object.entries(createCommand.args)) {
  program.argument(name, desc);
}

// eslint-disable-next-line no-restricted-syntax
for (const [flag, desc] of Object.entries(createCommand.options)) {
  program.option(flag, desc).allowUnknownOption();
}

program.parse();
