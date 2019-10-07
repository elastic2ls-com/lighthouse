module.exports = {
  extends: 'lighthouse:default',
  settings: {
    audits: [
      'first-meaningful-paint',
      'first-cpu-idle',
      'byte-efficiency/uses-optimized-images',
    ],
  },
};
