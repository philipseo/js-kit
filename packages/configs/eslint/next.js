module.exports = {
  extends: [
    require.resolve('./node'),
    require.resolve('./browser'),
    require.resolve('./reactjs'),
    require.resolve('./typescript'),
    'next/core-web-vitals',
  ],
};
