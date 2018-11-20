const chai = require('chai');
const expect = chai.expect;
const PO = require('../PageObject');


module.exports = function () {
  this.Before(() => {
    /**
     * Add a command to return an element within a shadow dom.
     * The command takes an array of selectors. Each subsequent
     * array member is within the preceding element's shadow dom.
     *
     * Example:
     *
     *     const elem = browser.shadowDomElement(['foo-bar', 'bar-baz', 'baz-foo']);
     *
     * Browsers which do not have native ShadowDOM support assume each selector is a direct
     * descendant of the parent.
     */
    if (typeof (browser.shadowDomElement) === 'undefined') {
      browser.addCommand('shadowDomElement', function (selector) {
        return this.execute((selectors) => {
          if (!Array.isArray(selectors)) {
            selectors = [selectors];
          }

          function findElement(selectors) {
            let currentElement = document;
            for (let i = 0; i < selectors.length; i++) {
              if (i > 0) {
                currentElement = currentElement.shadowRoot;
              }

              currentElement = currentElement.querySelector(selectors[i]);

              if (!currentElement) {
                break;
              }
            }

            return currentElement;
          }

          if (!(document.body.createShadowRoot || document.body.attachShadow)) {
            selectors = [selectors.join(' ')];
          }

          return findElement(selectors);
        }, selector);
      });
    }
  });



};
