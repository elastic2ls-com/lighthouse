module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-meaningful-paint',
      'speed-index',
      'first-cpu-idle',
      'interactive',
      'byte-efficiency/uses-optimized-images',
    ],
  },
};
