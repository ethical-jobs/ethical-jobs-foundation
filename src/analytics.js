/**
 * Fires an analytics job view event
 * @param {string} [slug]
 * @return object
 */
function jobView(jobSlug = '') {
  if (jobSlug.length) {
    return {
      category: 'jobs',
      action: 'view',
      dimension1: jobSlug,
    };    
  }
  return {};
}

/**
 * Fires an analytics job click event
 * @param {Object} event
 * @param {string} [jobSlug]
 * @return object
 */
function jobClick(event, jobSlug = '') {
  const tagName = event.target && event.target.tagName && event.target.tagName || '';
  if (tagName.toLowerCase() === 'a' && jobSlug.length) {
    return {
      category: 'jobs',
      action: 'apply',
      dimension1: jobSlug,
    };        
  }
  return {};
}

/**
 * Fires an analytics job search event
 * @param {Immutable} filters
 * @return object
 */
function jobSearch(filters) {
  const filtersJS = filters.toJS();
  return {
    category: 'jobs',
    action: 'search',
    dimension2: filtersJS.q,          // search:term
    dimension3: filtersJS.categories, // search:category
    dimension4: filtersJS.locations,  // search:location
    dimension5: filtersJS.workTypes,  // search:workType
    dimension6: filtersJS.sectors,    // search:sector
  };   
}

/**
 *
 * @param {Immutable} filters
 * @return object
 */
function alertSignup(email, filters) {
  const filtersJS = filters.toJS();
  if (email && email.length) {
    return {
      category: 'alerts',
      action: 'signup',
      dimension2: filtersJS.q,          // search:term
      dimension3: filtersJS.categories, // search:category
      dimension4: filtersJS.locations,  // search:location
      dimension5: filtersJS.workTypes,  // search:workType
      dimension7: email,
    };       
  }
  return {};
}

/**
 *
 * @param {Immutable} filters
 * @return object
 */
function alertConfirm(email, filters) {
  const filtersJS = filters.toJS();
  if (email && email.length) {
    return {
      category: 'alerts',
      action: 'confirm',
      dimension2: filtersJS.q,          // search:term
      dimension3: filtersJS.categories, // search:category
      dimension4: filtersJS.locations,  // search:location
      dimension5: filtersJS.workTypes,  // search:workType
      dimension7: email,
    };    
  }
  return {};
}

/**
 *
 * @param {Immutable} filters
 * @return object
 */
function alertUnsubscribe(email, filters) {
  const filtersJS = filters.toJS();
  if (email && email.length) {
    return {
      category: 'alerts',
      action: 'unsubscribe',
      dimension2: filtersJS.q,          // search:term
      dimension3: filtersJS.categories, // search:category
      dimension4: filtersJS.locations,  // search:location
      dimension5: filtersJS.workTypes,  // search:workType
      dimension7: email,
    };     
  }
  return {};
}

/**
 *
 * @param {Immutable} filters
 * @return object
 */
function weeklySubscribe(email) {
  if (email && email.length) {
    return {
      category: 'weekly-email',
      action: 'signup',
      dimension7: email,
    };       
  }
  return {};
}

export default {
  jobView,
  jobClick,
  jobSearch,
  alertSignup,
  alertConfirm,
  alertUnsubscribe,
  weeklySubscribe,
};
