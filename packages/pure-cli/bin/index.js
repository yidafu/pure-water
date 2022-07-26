import { program } from 'commander';
import { CommandService, ViteBundler } from '@pure/api';

const service = new CommandService(ViteBundler);

service.load().then(() => {
  service.commands.forEach((cmd) => {
    const cmdInst = program.command(cmd.name)
      .action((args) => {
        cmd.action(args);
      })
      .description(cmd.description);

    // TODO common --config/--debug flag
    // cmdInst.option('--config <config>').description('pure.config.js 文件路径');
    Object.entries(cmd.options).forEach(([flag, cmdOpt]) => {
      if (typeof cmdOpt === 'string') {
        cmdInst.option(flag, cmdOpt);
      } else {
        cmdInst.option(flag, cmdOpt.description, cmdOpt.defaultValue);
      }
    });
  });

  program.parse();
});
