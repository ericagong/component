export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // conventional-commit 규칙 따르되, 일부 커스터마이징
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
    ],
    'type-case': [2, 'always', 'lower-case'], // 타입 항상 소문자
    'type-empty': [2, 'never'], // No empty type
    'scope-case': [1, 'always', 'lower-case'], // scope는 선택사항이지만, 있으면 소문자
    'subject-empty': [2, 'never'], // description 필수
    'subject-case': [0], // description case 자유
    'subject-full-stop': [2, 'never', '.'], // No trailing period
    'header-max-length': [2, 'always', 100], // 헤더 최대 길이
  },
};
