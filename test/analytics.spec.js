import { Analytics } from '..';
import Immutable from 'immutable';
import sinon from 'sinon';

/**
 * ----------------------------------------
 */
describe('firePageView function', () => {

  test('it fires event with correct params', () => {
    global.ga = sinon.spy();
    Analytics.firePageView();
    expect(global.ga.calledOnce).toBe(true);
    expect(global.ga.args[0][0]).toBe('send');
    expect(global.ga.args[0][1]).toBe('pageview');
  });
});

/**
 * ----------------------------------------
 */
describe('fireJobView function', () => {

  test('it fires event with correct params', () => {
    global.ga = sinon.spy();
    Analytics.fireJobView('my-job-slug');
    expect(global.ga.calledOnce).toBe(true);
    expect(global.ga.args[0]).toEqual(['send', 'event', {
      eventCategory: 'jobs',
      eventAction: 'view',
      dimension1: 'my-job-slug',
    }]);
  });

  test('it wont fire event with empty slug', () => {
    global.ga = sinon.spy();
    Analytics.fireJobView();
    expect(global.ga.calledOnce).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('fireJobClick function', () => {

  test('it fires event when link event passed in', () => {
    global.ga = sinon.spy();
    const event = { target: { tagName: 'a' }};
    Analytics.fireJobClick(event, 'my-job-slug');
    expect(global.ga.calledOnce).toBe(true);
    expect(global.ga.args[0]).toEqual(['send', 'event', {
      eventCategory: 'jobs',
      eventAction: 'apply',
      dimension1: 'my-job-slug',
    }]);
  });

  test('it wont fire event with empty slug', () => {
    global.ga = sinon.spy();
    const event = { target: { tagName: 'a' }};
    Analytics.fireJobClick(event);
    expect(global.ga.calledOnce).toBe(false);
  });

  test('it wont fire event with invalid event', () => {
    global.ga = sinon.spy();
    Analytics.fireJobClick({ target: { tagName: 'div' }}, 'my-job-slug');
    Analytics.fireJobClick({ target: { tagName: 'h1' }}, 'my-job-slug');
    Analytics.fireJobClick({ target: { tagName: 'span' }}, 'my-job-slug');
    Analytics.fireJobClick({ target: { tagName: undefined }}, 'my-job-slug');
    Analytics.fireJobClick({ target: undefined}, 'my-job-slug');
    Analytics.fireJobClick({}, 'my-job-slug');
    expect(global.ga.calledOnce).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('fireJobSearch function', () => {

  test('it fires event when link event passed in', () => {
    global.ga = sinon.spy();
    const filters = Immutable.Map({
      q: 'Senior ReactJS javascript developer',
      categories: [18,27,83,2],
      locations: [87,37],
      workTypes: [1,27,3],
      sectors: [11,7,13],
    });
    Analytics.fireJobSearch(filters);
    expect(global.ga.calledOnce).toBe(true);
    expect(global.ga.args[0]).toEqual(['send', 'event', {
      eventCategory: 'jobs',
      eventAction: 'search',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18,27,83,2],
      dimension4: [87,37],
      dimension5: [1,27,3],
      dimension6: [11,7,13],
    }]);
  });
});

/**
 * ----------------------------------------
 */
describe('fireAlertSignup function', () => {

  test('it fires event with correct params', () => {
    global.ga = sinon.spy();
    Analytics.fireAlertSignup('andrew@ethicaljobs.com.au');
    expect(global.ga.calledOnce).toBe(true);
    expect(global.ga.args[0]).toEqual(['send', 'event', {
      eventCategory: 'users',
      eventAction: 'alert-signup',
      dimension7: 'andrew@ethicaljobs.com.au',
    }]);
  });

  test('it wont fire event with empty email', () => {
    global.ga = sinon.spy();
    Analytics.fireAlertSignup();
    expect(global.ga.calledOnce).toBe(false);
  });
});
