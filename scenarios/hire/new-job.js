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
      .pause(1000)
  },

  'It should post new job': function (browser) {
    browser
      .setValue('form input[name=title]', 'My amazing job')
      .setValue('form input[name=companyName]', 'My amazing company')
      .setValue('form div:nth-child(4) > div > div.froala-wrapper.f-basic > div', 'Short Description')
      .setValue('form div:nth-child(5) > div > div.froala-wrapper.f-basic > div', 'Long Description')
      .setValue('form input[name=location]', 'Amsterdam')
      .pause(500)
      .waitForElementVisible('.tt-suggestions', 500)
      .click('.tt-suggestions > div:nth-child(1)')
      .pause(200)
      .click('form > div.job-detail-footer button')
      .pause(2000)
      .click('.modal-footer > button')
      .pause(3000)
      .assert.urlContains('invoice-request');
  },

  'It should be new job into list': function (browser) {
    const fullUrl = url.resolve(browser.launchUrl, browser.globals.hirePath);

    browser
      .url(fullUrl)
      .pause(3000)
      .assert.containsText('#list-panel div.media-heading', 'My amazing job')
      .pause(1000);
  },

  'It should edit job': function (browser) {
    browser
      .click('#list-panel > div > a')
      .click('.job-detail-header > div > a:nth-child(1)')
      .pause(1000)
      .setValue('form input[name=title]', 'My edited amazing job')
      .pause(200)
      .click('form > div.job-detail-footer button')
      .pause(1000)
      .assert.containsText('#list-panel div.media-heading', 'My edited amazing job')
      .pause(1000);
  },

  'It should get share link': function (browser) {
    browser
      .click('#list-panel > div > a')
      .click('.job-detail-header > div > a:nth-child(3)')
      .pause(300)
      .click('.job-detail-body.col-xs-12.list-container > div > a:nth-child(1)')
      .assert.attributeContains('.job-detail-body > div > div:nth-child(2) > a:nth-child(3)', 'href', browser.launchUrl)
      .pause(100)
      .click('.detail-subview.row .job-detail-header > div > a')
      .pause(1000);
  },

  'It should deactivate job': function (browser) {
    browser
      .click('#list-panel > div > a')
      .click('.job-detail-header > div > a:nth-child(1)')
      .pause(1000)
      .click('.job-detail-footer > div.actions.pull-left > a')
      .pause(500)
      .click('.modal-footer > button.btn.btn-primary')
      .pause(1000)
      .assert.containsText('.job-detail-footer > div.actions.pull-left > a', 'Activate this job')
      .end();
  }
};