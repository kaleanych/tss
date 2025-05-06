const cucumber = require('cypress-cucumber-preprocessor').default;

const {defineConfig} = require('cypress')

require('dotenv').config()

module.exports = defineConfig({
    env: {
        homeURL: process.env.FRONTEND_ADDRESS
    },
    e2e: {
        specPattern: '**/*.feature',
        video: true,
        videoUploadOnPasses: false,
        setupNodeEvents(on, config) {
            on('file:preprocessor', cucumber());
        },
    },
});
