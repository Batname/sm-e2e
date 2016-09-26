'use strict';

const url = require('url');

module.exports = {
  'It shoud go to forgot form': function (browser) {
    const fullUrl = url.resolve(browser.launchUrl, '/hire');
    browser
      .url(fullUrl)
      .pause(2000)
      .click('#app > div > div > div > form > div:nth-child(5) > a')
      .pause(2000)
      .assert.containsText('#app > div > div > div > form > div.actions.centered > button', 'Reset password');
   },
   'It shoud send reset password form': function (browser) {
     browser
      .setValue('input[name=emailAddress]', 'dvdubinina@gmail.com')
      .pause(1000)
      .click('#app > div > div > div > form > div.actions.centered > button')
      .pause(1000)
      .assert.containsText('#app > div > div > div > form > div.actions.centered > button', 'loading...')
      .pause(1000)
      .end();
   }
};