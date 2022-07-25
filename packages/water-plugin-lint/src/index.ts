import {Plugin} from '@pure/api';

class LintPlugin extends Plugin {
  registerComman = function() {
    return {
      name: 'lint',
      options: {
        '--fix': 'autofix',
      },
      action() {
        console.log('run lint');
      },
      description: 'lint project',
    };
  };
}

export default LintPlugin;
