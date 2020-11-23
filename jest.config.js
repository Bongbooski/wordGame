module.exports = {
    moduleFileExtensions: [
      'js',
      'jsx',
      'json'
    ],
    transform: {
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/pages/$1'
    },
    testMatch: [
      '<rootDir>/(src/**/*.spec.(js|jsx|ts|tsx)|src/**/*.(js|jsx|ts|tsx))'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
  }