module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};