const { program } = require('commander');
const { CommandService, ViteBundler } = require('../lib');

const service = new CommandService(ViteBundler);


service.commands.forEach(cmd => {
  let cmdInst = program.command(cmd.name)
      .action((args) => {
      cmd.action(args);
    })
    .description(cmd.description)


  Object.entries(cmd.options).forEach(([flag, cmdOpt]) => {
    if (typeof cmdOpt === 'string') {
      cmdInst.option(flag, cmdOpt);
    } else {
      cmdInst.option(flag, cmdOpt.description, cmdOpt.defaultValue);
    }
  });
});


program.parse();