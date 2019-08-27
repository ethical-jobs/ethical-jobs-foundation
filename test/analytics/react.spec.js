import ReactGA from 'react-ga';
import Immutable from 'immutable';
import * as Analytics from '../../src/analytics/react';

ReactGA.initialize('foo-bar', { testMode: true });

afterEach(() => {
  ReactGA.testModeAPI.calls.splice(1, 1); // remove the last event call
});

describe('pageview', () => {
  test('it fires event correctly with no params', () => {
    Analytics.pageview();
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      'hitType': 'pageview',
      'page': 'blank'
    }]);
  });
  test('it fires event correctly with param', () => {
    Analytics.pageview('ethicaljobs.com.au?employer=unhcr');
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      'hitType': 'pageview',
      'page': 'ethicaljobs.com.au?employer=unhcr'
    }]);
  });
});

describe('jobView', () => {
  test('it fires event correctly', () => {
    Analytics.jobView('mock-job-slug');
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      'dimension1': 'mock-job-slug',
      'eventAction': 'View',
      'eventCategory': 'Jobs',
      'hitType': 'event',
    }]);
  });
  test('it does not fire event when slug is missing', () => {
    Analytics.jobView();
    expect(ReactGA.testModeAPI.calls.length).toEqual(1);
  });
});

describe('jobClick', () => {
  const event = {
    target: { tagName: 'a' },
  };
  test('it fires event correctly', () => {
    Analytics.jobClick(event, 'mock-job-slug');
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      'dimension1': 'mock-job-slug',
      'eventAction': 'Apply',
      'eventCategory': 'Jobs',
      'hitType': 'event',
    }]);
  });
  test('it does not fire event when slug is missing', () => {
    Analytics.jobClick(event);
    expect(ReactGA.testModeAPI.calls.length).toEqual(1);
  });
  test('it does not fire event on incorrect tag click', () => {
    const event = {
      target: { tagName: 'h1' },
    };
    Analytics.jobClick(event, 'mock-job-slug');
    expect(ReactGA.testModeAPI.calls.length).toEqual(1);
  });
});

describe('jobSearch', () => {
  test('it fires event correctly', () => {
    Analytics.jobSearch({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Jobs',
      eventAction: 'Search',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
  test('it handles immutable structures', () => {
    Analytics.jobSearch(Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Jobs',
      eventAction: 'Search',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
});


describe('jobSearchResults', () => {
  test('it fires event correctly', () => {
    Analytics.jobSearchResults(
      {
        q: 'Senior ReactJS javascript developer',
        categories: [18, 27, 83, 2],
        locations: [87, 37],
        workTypes: [1, 27, 3],
        sectors: [11, 7, 13],
      },
      15
    );
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Jobs',
      eventAction: 'Search-Results',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
      dimension8: 15,
      dimension9: true,
    }]);
  });

  test('it handles immutable structures', () => {
    Analytics.jobSearchResults(
      Immutable.fromJS({
        q: 'Senior ReactJS javascript developer',
        categories: [18, 27, 83, 2],
        locations: [87, 37],
        workTypes: [1, 27, 3],
        sectors: [11, 7, 13],
      }),
      5
    );
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Jobs',
      eventAction: 'Search-Results',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
      dimension8: 5,
      dimension9: true,
    }]);
  });

  test('it sends correct dimension9 when no results', () => {
    Analytics.jobSearchResults(
      {
        q: 'Senior ReactJS javascript developer',
        categories: [18, 27, 83, 2],
        locations: [87, 37],
        workTypes: [1, 27, 3],
        sectors: [11, 7, 13],
      },
      0
    );
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Jobs',
      eventAction: 'Search-Results',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
      dimension8: 0,
      dimension9: false,
    }]);
  });
});

describe('alertConfirm', () => {
  test('it fires event correctly', () => {
    Analytics.alertConfirm('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Confirm',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
  test('it handles immutable structures', () => {
    Analytics.alertConfirm('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Confirm',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
});

describe('alertSubscribe', () => {
  test('it fires event correctly', () => {
    Analytics.alertSubscribe('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Subscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
  test('it handles immutable structures', () => {
    Analytics.alertSubscribe('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Subscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
});

describe('alertUnsubscribe', () => {
  test('it fires event correctly', () => {
    Analytics.alertUnsubscribe('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Unsubscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
  test('it handles immutable structures', () => {
    Analytics.alertUnsubscribe('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Unsubscribe',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
});

describe('alertUpdate', () => {
  test('it fires event correctly', () => {
    Analytics.alertUpdate('WEEKLY', {
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    });
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Update',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
  test('it handles immutable structures', () => {
    Analytics.alertUpdate('WEEKLY', Immutable.fromJS({
      q: 'Senior ReactJS javascript developer',
      categories: [18, 27, 83, 2],
      locations: [87, 37],
      workTypes: [1, 27, 3],
      sectors: [11, 7, 13],
    }));
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      hitType: 'event',
      eventCategory: 'Alerts',
      eventAction: 'Update',
      dimension7: 'WEEKLY',
      dimension2: 'Senior ReactJS javascript developer',
      dimension3: [18, 27, 83, 2],
      dimension4: [87, 37],
      dimension5: [1, 27, 3],
      dimension6: [11, 7, 13],
    }]);
  });
});

describe('weeklySubscribe', () => {
  test('it fires event correctly', () => {
    Analytics.weeklySubscribe();
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      'eventAction': 'Signup',
      'eventCategory': 'Weekly-Email',
      'hitType': 'event',
    }]);
  });
});

describe('share', () => {
  test('it fires event correctly', () => {
    Analytics.share('mock-social-channel');
    expect(ReactGA.testModeAPI.calls[1]).toEqual(['send', {
      'eventAction': 'Share',
      'eventCategory': 'Social',
      'eventLabel': 'Mock-Social-Channel',
      'hitType': 'event',
    }]);
  });
  test('it does not fire event when slug is missing', () => {
    Analytics.share();
    expect(ReactGA.testModeAPI.calls.length).toEqual(1);
  });
});
