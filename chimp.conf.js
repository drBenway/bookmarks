module.exports = {
  // - - - - CHIMP - - - -
  // chimp on grid with: chimp chimp.conf.js --host="10.67.172.85" --port=4444
  watch: false, // change this and add @watch to your features to run tests side by side with your chages
  watchTags: '@watch,@focus',
  domainSteps: null,
  e2eSteps: null,
  fullDomain: false,
  domainOnly: false,
  e2eTags: '@e2e',
  watchWithPolling: false,
  server: false,
  serverPort: 8060,
  serverHost: 'localhost',
  sync: true,
  offline: false,
  showXolvioMessages: true,

  // - - - - env - - - -
  env : "test",

  // - - - - GULP CHIMP - - - -
  singleRun:  true,

  // - - - - CUCUMBER - - - -
  path: './test/e2e/features',
  format: 'pretty',
  tags: '~@ignore',
  singleSnippetPerFile: false,
  recommendedFilenameSeparator: '.',
  chai: true,
  screenshotsOnError: true,
  screenshotsPath: './test/e2e/output/screenshots',
  captureAllStepScreenshots: false,
  saveScreenshotsToDisk: true,
  saveScreenshotsToReport: true,
  jsonOutput: './test/e2e/output/cucumber.json',
  conditionOutput: true,

  // - - - - CUCUMBER REPORT - - - -
  htmlReport: true,
  theme: 'bootstrap',
  jsonFile: './test/e2e/output/cucumber.json',
  output: './test/e2e/output/cucumber.html',
  reportSuiteAsScenarios: true,
  launchReport: true,

  // - - - - SELENIUM  - - - -
  browser: 'chrome',
  platform: 'ANY',
  name: '',
  user: '',
  key: '',
  port: Math.floor(Math.random() * 8000) + 1000,
  host: null,

  // - - - - SAUCELABS - - - -
  // user: "",
  // key: "",
  // port: 80,
  // host: "ondemand.saucelabs.com",

  // - - - - WEBDRIVER-IO  - - - -
  webdriverio: {
    desiredCapabilities: {},
    logLevel: 'silent',
    logOutput: './test/e2e/output/logs',
    host: '127.0.0.1',
    port: Math.floor(Math.random() * 8000) + 1000,
    path: '/wd/hub',
    baseUrl: 'http://localhost:3000',
    coloredLogs: true,
    screenshotPath: './test/e2e/output/screenshots',
    waitforTimeout: 500,
    waitforInterval: 250
  },

  // - - - - SELENIUM-STANDALONE
  seleniumStandaloneOptions: {
    // check for more recent versions of selenium here:
    // http://selenium-release.storage.googleapis.com/index.html
    version: '2.53.1',
    baseURL: 'https://selenium-release.storage.googleapis.com',
    drivers: {
      chrome: {
        // check for more recent versions of chrome driver here:
        // http://chromedriver.storage.googleapis.com/index.html
        version: '71.0.3578.33',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com'
      },
      ie: {
        // check for more recent versions of internet explorer driver here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '2.50.0',
        arch: 'ia32',
        baseURL: 'https://selenium-release.storage.googleapis.com'
      }
    }
  },

  // - - - - SESSION-MANAGER  - - - -
  noSessionReuse: false,

  // - - - - MOCHA  - - - -
  mocha: false,
  // path: './test/e2e',
  mochaTags: '',
  mochaGrep: null,
  mochaTimeout: 60000,
  mochaReporter: 'spec',
  mochaSlow: 10000,

  // - - - - PHANTOM  - - - -
  phantom_w: 1280,
  phantom_h: 1024,

  // - - - - DEBUGGING  - - - -
  log: 'info',
  debug: false,
  seleniumDebug: null,
  debugCucumber: null,
  debugBrkCucumber: null,
  debugMocha: null,
  debugBrkMocha: null
};
