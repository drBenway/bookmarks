var PO = {
  url: 'localhost:3000',
  selector: {
    openModal: '#openModal'
  },
  isIE() {
    return (browser.options.desiredCapabilities && browser.options.desiredCapabilities.browserName === 'internet explorer');
  },
  isFirefox() {
    return (browser.options.desiredCapabilities && browser.options.desiredCapabilities.browserName === 'firefox');
  },
  /*
   ---------------------------
   1. navigate browser to a view
   ---------------------------
   */
  navigateTo: {
    // Go to the default page
    app() {
      browser.url(PO.url);
      browser.waitForVisible('#openModal', 2000);
    }
  },
  /*
   ---------------------------
   2. Access content in a view
   ---------------------------
   */
  conversationlistView: {
    // ---------------  shadowroot  ---------------
    getShadowRootList() {
      const shadowroot = browser.shadowDomElement('bookmarks-grid book-mark #myid'.split(' '));
      return shadowroot;
    }

  },

  /*
   ------------------------
   3. Access the navigation
   ------------------------
   */
  navigation: {
    // Get the first element in the navigation (inbox)
    getBookmarksNavigation() {
    }
  }



};
module.exports = PO;
