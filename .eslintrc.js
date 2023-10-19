module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['@member-protocol/custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
