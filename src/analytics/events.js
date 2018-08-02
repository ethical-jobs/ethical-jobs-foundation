import { fromImmutable } from '../utilities';

/**
 * Maps search paramaters to dimensions
 * @param {Object|Map} filters
 * @return {Object}
 */
export function searchDimensions(filters = {}) {
  const params = fromImmutable(filters);
  return {
    dimension2: params.q,          // search:term
    dimension3: params.categories, // search:category
    dimension4: params.locations,  // search:location
    dimension5: params.workTypes,  // search:workType
    dimension6: params.sectors,    // search:sector
  };
}

/**
 * Returns a job view event object
 * @param {string} jobSlug
 * @return {Object}
 */
export function jobView(jobSlug) {
  return {
    category: 'jobs',
    action: 'view',
    dimension1: jobSlug,
  };
}

/**
 * Returns a job click event object
 * @param {string} jobSlug
 * @return {Object}
 */
export function jobClick(jobSlug) {
  return {
    category: 'jobs',
    action: 'apply',
    dimension1: jobSlug,
  };
}

/**
 * Returns an job search event object
 * @param {Object|Map} filters
 * @return {Object}
 */
export function jobSearch(filters) {
  return {
    category: 'jobs',
    action: 'search',
    ...searchDimensions(filters),
  };
}

/**
 * Returns an alert confirm event object
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {Object}
 */
export function alertConfirm(frequency, filters) {
  return {
    category: 'alerts',
    action: 'confirm',
    dimension7: frequency, // alert:frequency
    ...searchDimensions(filters),
  };
}

/**
 * Returns an alert subscribe event object
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {Object}
 */
export function alertSubscribe(frequency, filters) {
  return {
    category: 'alerts',
    action: 'subscribe',
    dimension7: frequency, // alert:frequency
    ...searchDimensions(filters),
  };
}

/**
 * Returns an alert unsubscribe event object
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {Object}
 */
export function alertUnsubscribe(frequency, filters) {
  return {
    category: 'alerts',
    action: 'unsubscribe',
    dimension7: frequency, // alert:frequency
    ...searchDimensions(filters),
  };
}

/**
 * Returns an alert update event object
 * @param {string} frequency
 * @param {Object|Map} filters
 * @return {Object}
 */
export function alertUpdate(frequency, filters) {
  return {
    category: 'alerts',
    action: 'update',
    dimension7: frequency, // alert:frequency
    ...searchDimensions(filters),
  };
}

/**
 * Returns an weekly-email-list subscribe event object
 * @return {Object}
 */
export function weeklySubscribe() {
  return {
    category: 'weekly-email',
    action: 'signup',
  };
}

/**
 * Returns a share event object
 * @param {string} channel
 * @return {Object}
 */
export function share(channel) {
  return {
    category: 'social',
    action: 'share',
    label: channel,
  };
}
