module.exports = {
    mutate: ['fn.js'],
    mutator: 'javascript',
    testRunner: 'mocha',
    mochaOptions: {
        spec: ['test/**/*.js']
    },
    reporters: ['progress', 'clear-text', 'html'],
    coverageAnalysis: 'perTest',
    thresholds: { high: 80, low: 60, break: 50 }
};