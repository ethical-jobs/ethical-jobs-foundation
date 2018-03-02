/**
 * Analytics tracking code for injection into page.
 * @type string
 */
const trackingCode = `
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-8452399-1', 'auto');
`;

/**
 * Fires an analytics pageview
 * @return void
 */
function firePageView() {
  ga('send', 'pageview');
}

/**
 * Fires an analytics job view event
 * @param {string} [slug]
 * @return void
 */
function fireJobView(jobSlug = '') {
  if (jobSlug.length) {
    ga('send', 'event', {
      eventCategory: 'jobs',
      eventAction: 'view',
      dimension1: jobSlug,
    });
  }
}

/**
 * Fires an analytics job click event
 * @param {Object} event
 * @param {string} [jobSlug]
 * @return void
 */
function fireJobClick(event, jobSlug = '') {
  const tagName = event.target && event.target.tagName && event.target.tagName || '';
  if (tagName.toLowerCase() === 'a' && jobSlug.length) {
    ga('send', 'event', {
      eventCategory: 'jobs',
      eventAction: 'apply',
      dimension1: jobSlug,
    });
  }
}

/**
 * Fires an analytics job search event
 * @param {Immutable} filters
 * @return void
 */
function fireJobSearch(filters) {
  const filtersJS = filters.toJS();
  ga('send', 'event', {
    eventCategory: 'jobs',
    eventAction: 'search',
    dimension2: filtersJS.q,          // search:term
    dimension3: filtersJS.categories, // search:category
    dimension4: filtersJS.locations,  // search:location
    dimension5: filtersJS.workTypes,  // search:workType
    dimension6: filtersJS.sectors,    // search:sector
  });
}

export default {
  trackingCode,
  firePageView,
  fireJobView,
  fireJobClick,
  fireJobSearch,
};