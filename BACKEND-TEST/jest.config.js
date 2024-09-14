/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  moduleNameMapper: {
    '^@admin/module$': '<rootDir>/src/modules/admin/admin.module',
    '^@admin/controller$': '<rootDir>/src/modules/admin/controller/admin.controller',
    '^@utils$': '<rootDir>/src/commons/utils/index',
    '^@config/config-app$': '<rootDir>/src/config/index',
    '^@middleware/validator$': '<rootDir>/src/commons/middleware/index',
    '^@auth/module$': '<rootDir>/src/modules/authenticate/authenticate.module',
    '^@auth/controller$': '<rootDir>/src/modules/authenticate/controller/authenticate.controller',
    '^@member/module$': '<rootDir>/src/modules/members/member.module',
    '^@member/controller$': '<rootDir>/src/modules/members/controller/member.controller',
    '^@borrowbooks/module$': '<rootDir>/src/modules/borrowbook/borrowbook.module',
    '^@borrowbooks/controller$': '<rootDir>/src/modules/borrowbook/controller/borrowbook.controller',
    '^@books/module$': '<rootDir>/src/modules/books/book.module',
    '^@books/controller$': '<rootDir>/src/modules/books/controller/book.controller',
    '^@books/service$': '<rootDir>/src/modules/books/services/book.service',
  },
};