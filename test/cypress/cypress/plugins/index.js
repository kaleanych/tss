const cucumber = require('cypress-cucumber-preprocessor').default;
const browserify = require('@cypress/browserify-preprocessor');
const path = require('path');

module.exports = (on, config) => {
    const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve('typescript'),
    };

    on('file:preprocessor', cucumber(options))

    on('task', {
        log(message) {
            console.log(message);
            return null;
        },
    });

    return config;
};
