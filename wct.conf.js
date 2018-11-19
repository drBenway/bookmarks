module.exports = {
  suites: ['test/wct/**/*.html', 'src/**/*/test/wct/*.html'],
  clientOptions: {
    numConcurrentSuites: 10,
    environmentScripts: [
      'stacky/browser.js',
      'async/lib/async.js',
      'lodash/lodash.js',
      'mocha/mocha.js',
      'chai/chai.js',
      'sinonjs/sinon.js',
      'sinon-chai/lib/sinon-chai.js'
    ]
  },
  plugins: {
    local: {
      browsers: ['chrome'],
      browserOptions: {
        chrome: ['window-size=1920,1080', 'disable-gpu']
      }
    }
  }
}
