'use strict';

const url = require('url');
const crypto = require('crypto');

const email = crypto.randomBytes(20).toString('hex') + '@gmail.com';
const pass = crypto.randomBytes(10).toString('hex');

module.exports = {
  'It should register new user' : function (browser) {
    const fullUrl = url.resolve(browser.launchUrl, browser.globals.hirePath);
    browser
      .url(fullUrl)
      .waitForElementVisible('body', 1000)
      .click('div.centered > a')
      .pause(100)
      .setValue('form.fv-form input[name=firstName]', 'Denis')
      .setValue('form.fv-form input[name=lastName]', 'Dubinin')
      .setValue('form.fv-form input[name=emailAddress]', email)
      .setValue('form.fv-form input[name=password]', pass)
      .click('form.fv-form button.btn-block')
      .waitForElementVisible('.job-detail-outer', 3000)
      .assert.urlContains('jobs')
      .click('div.job-detail-header a')
      .pause(1000)
  },

  'It should logout': function (browser) {
    browser
      .click('#nav-panel div.btn-group > a')
      .click('#nav-panel div.btn-group.open > ul > li > a')
      .pause(500)
      .assert.urlContains('login')
      .pause(500);
  },

  'It should login': function (browser) {
    browser
      .setValue('form.fv-form input[name=emailAddress]', email)
      .setValue('form.fv-form input[name=password]', pass)
      .pause(500)
      .click('form.fv-form button.btn-block')
      .waitForElementVisible('#detail-panel', 3000)
      .assert.urlContains('jobs')
      .end();
  }
};