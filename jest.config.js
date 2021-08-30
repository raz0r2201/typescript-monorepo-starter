const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  coverageReporters: ['json', 'html'],
  moduleDirectories: ['.', 'node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      compilerOptions.paths,
    ),
  },
  testEnvironment: 'node',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  }
}
