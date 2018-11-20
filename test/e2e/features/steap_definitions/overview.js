module.exports = function() {

  this.Given(/^I have an open browser$/, function () {});

  this.Then(/^I go to localhost:3000$/, function () {
    browser.url('http://localhost:3000/');
  });

  this.Then(/^I should see a webpage with title Bookmarks$/, function () {
    expect(browser.getTitle()).to.equal('Bookmarks');
  });

  this.Then(/^I should have a button to add bookmarks$/, function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

};
