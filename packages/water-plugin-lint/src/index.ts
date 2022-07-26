import { Plugin } from '@pure/api';
import { runEslint } from './eslint';

interface ILintPluginOption {
  fix: boolean;
}

class LintPlugin extends Plugin {
  registerCommand = function () {
    return {
      name: 'lint',
      options: {
        '--fix': 'Automatically fix problems',
      },
      async action(option: ILintPluginOption) {
        await runEslint(option.fix);
      },
      description: 'lint project',
    };
  };
}

export default LintPlugin;
