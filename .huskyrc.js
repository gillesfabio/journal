module.exports = {
  'hooks': {
    'pre-commit': 'lint-staged && npm t'
  }
}