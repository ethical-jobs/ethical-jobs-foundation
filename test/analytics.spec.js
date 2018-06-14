import Immutable from 'immutable';
import { Analytics } from '../src';

/**
 * ----------------------------------------
 */
describe('jobView function', () => {

  test('it returns correct params', () => {
    const data = Analytics.jobView('my-job-slug');
    expect(data).toEqual({
      category: 'jobs',
      action: 'view',
      dimension1: 'my-job-slug',
    });
  });

  test('it wont fire event with empty slug', () => {
    const data = Analytics.jobView();
    expect(data).toEqual({});
  });
});

/**
 * ----------------------------------------
 */
describe('jobClick function', () => {

  test('it fires event when link event passed in', () => {
    const event = { target: { tagName: 'a' } };
    const data = Analytics.jobClick(event, 'my-job-slug');
    expect(data).toEqual({
      category: 'jobs',
      action: 'apply',
      dimension1: 'my-job-slug',
    });
  });

  test('it wont fire event with empty slug', () => {
    const event = { target: { tagName: 'a' } };
    const data = Analytics.jobClick(event);
    expect(data).toEqual({});
  });

  test('it wont fire event with invalid event', () => {
    expect(Analytics.jobClick({target: {tagName: 'div'}}, 'my-job-slug')).toEqual({});
    expect(Analytics.jobClick({target: {tagName: 'h1'}}, 'my-job-slug')).toEqual({});
    expect(Analytics.jobClick({target: {tagName: 'span'}}, 'my-job-slug')).toEqual({});
    expect(Analytics.jobClick({target: {tagName: undefined}}, 'my-job-slug')).toEqual({});
    expect(Analytics.jobClick({target: undefined}, 'my-job-slug')).toEqual({});
    expect(Analytics.jobClick({}, 'my-job-slug')).toEqual({});
  });
});

/**
 * ----------------------------------------
 */
describe('jobSearch function', () => {

  test('it fires event when link event passed in', () => {
    const filters = Immutable.Map({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    const data = Analytics.jobSearch(filters);
    expect(data).toEqual({
      category: 'jobs',
      action: 'search',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });
});

/**
 * ----------------------------------------
 */
describe('alertSignup function', () => {

  test('it fires event with correct params', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertSignup('andrew@ethicaljobs.com.au', filters);
    expect(data).toEqual({
      category: 'alerts',
      action: 'signup',
      dimension7: 'andrew@ethicaljobs.com.au',
      dimension2: 'Senior support worker',
      dimension3: [1],
      dimension4: [7],
      dimension5: [3],
    });
  });

  test('it will fire event with empty filters', () => {
    const filters = Immutable.Map({});
    const data = Analytics.alertSignup('andrew@ethicaljobs.com.au', filters);
    expect(data).toEqual({
      category: 'alerts',
      action: 'signup',
      dimension7: 'andrew@ethicaljobs.com.au',
    });
  });

  test('it wont fire event with empty email', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertSignup('', filters);
    expect(data).toEqual({});
  });

  test('it wont fire event on null.', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertSignup(null, filters);
    expect(data).toEqual({});
  });

  test('it wont fire event on undefined.', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertSignup(undefined, filters);
    expect(data).toEqual({});
  });
});


/**
 * ----------------------------------------
 */
describe('alertConfirm function', () => {

  test('it fires event with correct params', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertConfirm('andrew@ethicaljobs.com.au', filters);
    expect(data).toEqual({
      category: 'alerts',
      action: 'confirm',
      dimension7: 'andrew@ethicaljobs.com.au',
      dimension2: 'Senior support worker',
      dimension3: [1],
      dimension4: [7],
      dimension5: [3],
    });
  });

  test('it will fire event with empty filters', () => {
    const filters = Immutable.Map({});
    const data = Analytics.alertConfirm('andrew@ethicaljobs.com.au', filters);
    expect(data).toEqual({
      category: 'alerts',
      action: 'confirm',
      dimension7: 'andrew@ethicaljobs.com.au',
    });
  });

  test('it wont fire event with empty email', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertConfirm('', filters);
    expect(data).toEqual({});
  });
});

/**
 * ----------------------------------------
 */
describe('alertUnsubscribe function', () => {

  test('it fires event with correct params', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertUnsubscribe('andrew@ethicaljobs.com.au', filters);
    expect(data).toEqual({
      category: 'alerts',
      action: 'unsubscribe',
      dimension7: 'andrew@ethicaljobs.com.au',
      dimension2: 'Senior support worker',
      dimension3: [1],
      dimension4: [7],
      dimension5: [3],
    });
  });

  test('it will fire event with empty filters', () => {
    const filters = Immutable.Map({});
    const data = Analytics.alertUnsubscribe('andrew@ethicaljobs.com.au', filters);
    expect(data).toEqual({
      category: 'alerts',
      action: 'unsubscribe',
      dimension7: 'andrew@ethicaljobs.com.au',
    });
  });

  test('it wont fire event with empty email', () => {
    const filters = Immutable.Map({
      q: 'Senior support worker',
      categories: [1],
      locations: [7],
      workTypes: [3],
    });
    const data = Analytics.alertUnsubscribe('',filters);
    expect(data).toEqual({});
  });
});

/**
 * ----------------------------------------
 */
describe('weeklySubscribe function', () => {

  test('it fires event with correct params', () => {
    const data = Analytics.weeklySubscribe('andrew@ethicaljobs.com.au');
    expect(data).toEqual({
      category: 'weekly-email',
      action: 'signup',
      dimension7: 'andrew@ethicaljobs.com.au',
    });
  });

  test('it wont fire event with empty email', () => {
    const data = Analytics.weeklySubscribe('');
    expect(data).toEqual({});
  });
});