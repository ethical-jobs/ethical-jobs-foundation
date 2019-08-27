import Immutable from 'immutable';
import * as Events from '../../src/analytics/events';

/**
 * ----------------------------------------
 */
describe('searchDimensions function', () => {

  test('it can handle immutable data structures', () => {
    const filters = Immutable.Map({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(Events.searchDimensions(filters)).toEqual({
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });

  test('it can handle plain javascript parameters', () => {
    const filters = {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    };
    expect(Events.searchDimensions(filters)).toEqual({
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });
});

describe('jobView function', () => {

  test('it returns correct event structure', () => {
    const event = Events.jobView('mock-job-slug');
    expect(event).toEqual({
      category: 'jobs',
      action: 'view',
      dimension1: 'mock-job-slug',
    });
  });

  test('it has undefined string default', () => {
    const event = Events.jobView();
    expect(event).toEqual({
      category: 'jobs',
      action: 'view',
      dimension1: undefined,
    });
  });
});

describe('jobClick function', () => {

  test('it returns correct event structure', () => {
    const event = Events.jobClick('mock-job-slug');
    expect(event).toEqual({
      category: 'jobs',
      action: 'apply',
      dimension1: 'mock-job-slug',
    });
  });

  test('it has undefined string default', () => {
    const event = Events.jobClick();
    expect(event).toEqual({
      category: 'jobs',
      action: 'apply',
      dimension1: undefined,
    });
  });
});

describe('weeklySubscribe function', () => {

  test('it returns correct event structure', () => {
    const event = Events.weeklySubscribe();
    expect(event).toEqual({
      category: 'weekly-email',
      action: 'signup',
    });
  });
});

describe('jobSearch function', () => {

  test('it returns correct event structure', () => {
    const event = Events.jobSearch({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(event).toEqual({
      category: 'jobs',
      action: 'search',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });

  test('it handles immutable structures', () => {
    const event = Events.jobSearch(Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(event).toEqual({
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


describe('jobSearchResults function', () => {

  test('it returns correct event structure', () => {
    const event = Events.jobSearchResults(
      {
        q: 'Senior ReactJS javascript developer',
        categories: [18, 27, 83, 2],
        locations: [87, 37],
        workTypes: [1, 27, 3],
        sectors: [11, 7, 13],
      },
      5
    );
    expect(event).toEqual({
      category: 'jobs',
      action: 'search-results',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
      dimension8: 5,
      dimension9: true,
    });
  });

  test('it handles immutable structures', () => {
    const event = Events.jobSearchResults(
      Immutable.fromJS({
        q: 'Senior ReactJS javascript developer',
        categories: [18, 27, 83, 2],
        locations: [87, 37],
        workTypes: [1, 27, 3],
        sectors: [11, 7, 13],
      }),
      99
    );
    expect(event).toEqual({
      category: 'jobs',
      action: 'search-results',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
      dimension8: 99,
      dimension9: true,
    });
  });

  test('it sends correct dimension9 when no results', () => {
    const event = Events.jobSearchResults(
      {
        q: 'Senior ReactJS javascript developer',
        categories: [18, 27, 83, 2],
        locations: [87, 37],
        workTypes: [1, 27, 3],
        sectors: [11, 7, 13],
      },
      0
    );
    expect(event).toEqual({
      category: 'jobs',
      action: 'search-results',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
      dimension8: 0,
      dimension9: false,
    });
  });
});

describe('alertConfirm function', () => {

  test('it returns correct event structure', () => {
    const event = Events.alertConfirm('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(event).toEqual({
      category: 'alerts',
      action: 'confirm',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });

  test('it handles immutable structures', () => {
    const event = Events.alertConfirm('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(event).toEqual({
      category: 'alerts',
      action: 'confirm',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });
});

describe('alertSubscribe function', () => {

  test('it returns correct event structure', () => {
    const event = Events.alertSubscribe('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(event).toEqual({
      category: 'alerts',
      action: 'subscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });

  test('it handles immutable structures', () => {
    const event = Events.alertSubscribe('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(event).toEqual({
      category: 'alerts',
      action: 'subscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });
});


describe('alertUnsubscribe function', () => {

  test('it returns correct event structure', () => {
    const event = Events.alertUnsubscribe('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(event).toEqual({
      category: 'alerts',
      action: 'unsubscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });

  test('it handles immutable structures', () => {
    const event = Events.alertUnsubscribe('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(event).toEqual({
      category: 'alerts',
      action: 'unsubscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });
});

describe('alertUpdate function', () => {

  test('it returns correct event structure', () => {
    const event = Events.alertUpdate('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(event).toEqual({
      category: 'alerts',
      action: 'update',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });

  test('it handles immutable structures', () => {
    const event = Events.alertUpdate('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(event).toEqual({
      category: 'alerts',
      action: 'update',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    });
  });
});

describe('share function', () => {

  test('it returns correct event structure', () => {
    const event = Events.share('my-social-network');
    expect(event).toEqual({
      category: 'social',
      action: 'share',
      label: 'my-social-network',
    });
  });

  test('it has undefined by default', () => {
    const event = Events.share();
    expect(event).toEqual({
      category: 'social',
      action: 'share',
      label: undefined,
    });
  });
});