import { Commit, Plugin, RuleConfigCondition } from '@commitlint/types';
const bizModulePlugin: Plugin = {
  rules: {
    'subject-biz-module': function bizModuleRule(parsed: Commit, when?: RuleConfigCondition, value?: string[]) {
      if (parsed.subject) {
        const bizModule = /\[([^\]]+)].*/.exec(parsed.subject)?.[1];
        if (when === 'always') {
          if (value && value.length > 0) {
            return [value.includes(bizModule ?? ''), `Biz Module must be one of ${value.join(',')} `];
          } else {
            return [!!bizModule, 'Your subject must contain [Biz Module]'];
          }
        } else {
          return [!bizModule, `Your subject should not contain [${bizModule}]`];
        }
      } else {
        return [false, 'Your subject should not contain [Biz Module]'];
      }
    },
  },
};

export { bizModulePlugin };