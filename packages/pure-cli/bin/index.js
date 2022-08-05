import { program } from 'commander';
import { CommandService } from '@pure-org/api';

const service = new CommandService();

service.load().then(() => {
  service.commands.forEach((cmd) => {
    const cmdInst = program.command(cmd.name)
      .action((...args) => {
        cmd.action(...args);
      })
      .allowUnknownOption()
      .description(cmd.description);
    if (cmd.alias) {
      cmdInst.alias(cmd.alias);
    }
   Object.entries(cmd.args ?? {}).forEach(([name, desc]) => {
    cmdInst.argument(name, desc);
   });
    // TODO common --config/--debug flag
    // cmdInst.option('--config <config>').description('pure.config.js 文件路径');
    Object.entries(cmd.options).forEach(([flag, cmdOpt]) => {
      if (typeof cmdOpt === 'string') {
        cmdInst.option(flag, cmdOpt).allowUnknownOption();
      } else {
        cmdInst.option(flag, cmdOpt.description, cmdOpt.defaultValue).allowUnknownOption();
      }
    });
  });

  program.parse();
});
