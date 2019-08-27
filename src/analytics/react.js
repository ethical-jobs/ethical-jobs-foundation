import ReactGA from 'react-ga';
import * as Events from './events';

/**
 * Initiates tracking of a GA property
 * @param {string} property
 * @param {Object} settings
 * @return {undefined}
 */
export function init(property, settings) {
  ReactGA.initialize(property, {
    ...settings,
    titleCase: false,
  });
}

/**
 * Fires a pageview event
 * @param {string} property
 * @param {Object} settings
 * @return {undefined}
 */
export function pageview(path = '') {
  let uri = window.location.pathname + window.location.search;
  if (path.length > 0) {
    uri = path;
  }
  ReactGA.pageview(uri);
}


/**
 * Fires a job view event
 * @param {string} jobSlug
 * @return {undefined}
 */
export function jobView(jobSlug = '') {
  if (jobSlug.length) {
    ReactGA.event(
      Events.jobView(jobSlug)
    );
  }
}

/**
 * Fires a job click event
 * @param {Object} event
 * @param {string} jobSlug
 * @return {undefined}
 */
export function jobClick(event, jobSlug = '') {
  const tagName = event.target && event.target.tagName && event.target.tagName || '';
  if (tagName.toLowerCase() === 'a' && jobSlug.length) {
    ReactGA.event(
      Events.jobClick(jobSlug)
    );
  }
}

/**
 * Fires a job search event
 * @param {Object|Map} filters
 * @return {undefined}
 */
export function jobSearch(filters) {
  ReactGA.event(
    Events.jobSearch(filters)
  );
}

/**
 * Fires a job search results event
 * @param {Object|Map} filters
 * @param int numResults
 * @return {undefined}
 */
export function jobSearchResults(filters, numResults) {
  ReactGA.event(
    Events.jobSearchResults(filters, numResults)
  );
}

/**
 * Fires an alert confirmation event
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {undefined}
 */
export function alertConfirm(frequency, filters) {
  ReactGA.event(
    Events.alertConfirm(frequency, filters)
  );
}

/**
 * Fires an alert subscribe event
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {undefined}
 */
export function alertSubscribe(frequency, filters) {
  ReactGA.event(
    Events.alertSubscribe(frequency, filters)
  );
}

/**
 * Fires an alert unsubscribe event
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {undefined}
 */
export function alertUnsubscribe(frequency, filters) {
  ReactGA.event(
    Events.alertUnsubscribe(frequency, filters)
  );
}

/**
 * Fires an alert update event
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {undefined}
 */
export function alertUpdate(frequency, filters) {
  ReactGA.event(
    Events.alertUpdate(frequency, filters)
  );
}

/**
 * Fires a social share event
 * @return {undefined}
 */
export function weeklySubscribe() {
  ReactGA.event(
    Events.weeklySubscribe()
  );
}

/**
 * Fires a social share event
 * @param {string} channel
 * @return {undefined}
 */
export function share(channel = '') {
  if (channel.length) {
    ReactGA.event(
      Events.share(channel)
    );
  }
}
