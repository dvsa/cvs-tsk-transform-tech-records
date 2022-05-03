module.exports = {
  verbose: true,
  transform: {'\\.ts$': ['ts-jest']},
  testPathIgnorePatterns: ['/.build/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/.build/', '/.serverless/', '/reports/', '/.artifact/', '/src/config/'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  }
};
