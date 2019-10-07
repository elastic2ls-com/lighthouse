module.exports = {
  extends: 'lighthouse:default',
  settings: {
    {
    categories: {
      performance: {
        auditRefs: [
          {id: 'my-performance-metric', weight: 2, group: 'metrics'},
        ],
      }
    },
    groups: {
      'metrics': {
        title: 'Metrics',
        description: 'These metrics encapsulate your web app\'s performance across a number of dimensions.'
      },
    }
  }
}
};
