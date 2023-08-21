module.exports = {
  '**/*.(ts|tsx|js|jsx)': (filenames) => [
    `eslint ${filenames.join(' ')}`,
    `prettier --check ${filenames.join(' ')}`,
  ],
  '**/*.(md|json|yaml|json|yml)': (filenames) =>
    `prettier --check ${filenames.join(' ')}`,
};
