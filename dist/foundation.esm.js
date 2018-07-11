var roles = {
  'service-account': {
    name: 'service-account',
    description: 'Service account'
  },
  'admin': {
    name: 'admin',
    description: 'Administrator'
  },
  'staff-member': {
    name: 'staff-member',
    description: 'Staff Member'
  },
  'relations-team': {
    name: 'relations-team',
    description: 'Relationships Team'
  },
  'customer-service-team': {
    name: 'customer-service-team',
    description: 'Customer Service Team'
  },
  'employer-member': {
    name: 'employer-member',
    description: 'Employer user'
  },
  'job-seeker': {
    name: 'job-seeker',
    description: 'Job seeker'
  }
};

/**
 * Checks if auth token present
 * @return Bool
 */
function hasToken() {
  return localStorage.getItem('_token') ? true : false;
}

/**
 * Checks if there is a token and user
 * @param Object user
 * @return Bool
 */
function isAuthLoaded(user) {
  return (user && user.size > 0 && hasToken()) === true;
}

/**
 * Checks if a user has {role}
 * @param Object user
 * @param String role
 * @return Bool
 */
function hasRole(user, role) {
  if (user && user.has('roles')) {
    if (user.get('roles').includes(role)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a user has all {roles}
 * @param Object user
 * @param Array roles
 * @return Bool
 */
function hasAllRoles(user, roles) {
  if (user && user.has('roles')) {
    return roles.every(function (role) {
      return user.get('roles').includes(role);
    }) && user.get('roles').every(function (role) {
      return roles.includes(role);
    });
  }
  return false;
}

/**
 * Checks if a user any of {roles}
 * @param Object user
 * @param Array roles
 * @return Bool
 */
function hasAnyRole(user, roles) {
  if (user && user.has('roles')) {
    return roles.every(function (role) {
      return user.get('roles').includes(role);
    }) || user.get('roles').every(function (role) {
      return roles.includes(role);
    });
  }
  return false;
}

/**
 * Checks if a user is an "admin"
 * @param Object user
 * @return Bool
 */
function isAdmin(user) {
  return hasRole(user, 'admin');
}

/**
 * Checks if a user has "staff-member" role
 * @param Object user
 * @return Bool
 */
function isStaffMember(user) {
  return hasRole(user, 'staff-member');
}

/**
 * Returns the route to the users app
 * @param Object user
 * @return Bool
 */
function getUserApp(user) {
  return isStaffMember(user) ? '/admin' : '/organisation';
}

/**
 * Returns a users roles
 * @param Object user
 * @return Array
 */
function userRolesSelector(user) {
  return user && user.has('roles') && user.get('roles').toArray() || [];
}

var authentication = /*#__PURE__*/Object.freeze({
  roles: roles,
  hasToken: hasToken,
  isAuthLoaded: isAuthLoaded,
  hasRole: hasRole,
  hasAllRoles: hasAllRoles,
  hasAnyRole: hasAnyRole,
  isAdmin: isAdmin,
  isStaffMember: isStaffMember,
  getUserApp: getUserApp,
  userRolesSelector: userRolesSelector
});

/**
 * Fires an analytics job view event
 * @param {string} [slug]
 * @return {object}
 */
function jobView() {
  var jobSlug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (jobSlug.length) {
    return {
      category: 'jobs',
      action: 'view',
      dimension1: jobSlug
    };
  }
  return {};
}

/**
 * Fires an analytics job click event
 * @param {Object} event
 * @param {string} [jobSlug]
 * @return {object}
 */
function jobClick(event) {
  var jobSlug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var tagName = event.target && event.target.tagName && event.target.tagName || '';
  if (tagName.toLowerCase() === 'a' && jobSlug.length) {
    return {
      category: 'jobs',
      action: 'apply',
      dimension1: jobSlug
    };
  }
  return {};
}

/**
 * Fires an analytics job search event
 * @param {Immutable} filters
 * @return {object}
 */
function jobSearch(filters) {
  var filtersJS = filters.toJS();
  return {
    category: 'jobs',
    action: 'search',
    dimension2: filtersJS.q, // search:term
    dimension3: filtersJS.categories, // search:category
    dimension4: filtersJS.locations, // search:location
    dimension5: filtersJS.workTypes, // search:workType
    dimension6: filtersJS.sectors // search:sector
  };
}

/**
 *
 * @param {Immutable} filters
 * @return {object}
 */
function alertSignup(email, filters) {
  var filtersJS = filters.toJS();
  if (email && email.length) {
    return {
      category: 'alerts',
      action: 'signup',
      dimension2: filtersJS.q, // search:term
      dimension3: filtersJS.categories, // search:category
      dimension4: filtersJS.locations, // search:location
      dimension5: filtersJS.workTypes, // search:workType
      dimension7: email
    };
  }
  return {};
}

/**
 *
 * @param {Immutable} filters
 * @return {object}
 */
function alertConfirm(email, filters) {
  var filtersJS = filters.toJS();
  if (email && email.length) {
    return {
      category: 'alerts',
      action: 'confirm',
      dimension2: filtersJS.q, // search:term
      dimension3: filtersJS.categories, // search:category
      dimension4: filtersJS.locations, // search:location
      dimension5: filtersJS.workTypes, // search:workType
      dimension7: email
    };
  }
  return {};
}

/**
 *
 * @param {Immutable} filters
 * @return {object}
 */
function alertUnsubscribe(email, filters) {
  var filtersJS = filters.toJS();
  if (email && email.length) {
    return {
      category: 'alerts',
      action: 'unsubscribe',
      dimension2: filtersJS.q, // search:term
      dimension3: filtersJS.categories, // search:category
      dimension4: filtersJS.locations, // search:location
      dimension5: filtersJS.workTypes, // search:workType
      dimension7: email
    };
  }
  return {};
}

/**
 *
 * @param {Immutable} filters
 * @return {object}
 */
function weeklySubscribe(email) {
  if (email && email.length) {
    return {
      category: 'weekly-email',
      action: 'signup',
      dimension7: email
    };
  }
  return {};
}

/**
 * @param {string} channel e.g. 'facebook'
 * @return {object}
 */
function share(channel) {
  if (channel) {
    return {
      category: 'social',
      action: 'share',
      label: channel
    };
  }
  return {};
}

var analytics = /*#__PURE__*/Object.freeze({
  jobView: jobView,
  jobClick: jobClick,
  jobSearch: jobSearch,
  alertSignup: alertSignup,
  alertConfirm: alertConfirm,
  alertUnsubscribe: alertUnsubscribe,
  weeklySubscribe: weeklySubscribe,
  share: share
});

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

var is_date = isDate;

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var parseTokenDateTimeDelimeter = /[T ]/;
var parseTokenPlainTime = /:/;

// year tokens
var parseTokenYY = /^(\d{2})$/;
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
];

var parseTokenYYYY = /^(\d{4})/;
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
];

// date tokens
var parseTokenMM = /^-(\d{2})$/;
var parseTokenDDD = /^-?(\d{3})$/;
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
var parseTokenWww = /^-?W(\d{2})$/;
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/;
var parseTokenTimezoneZ = /^(Z)$/;
var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (is_date(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits;
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  } else {
    additionalDigits = Number(additionalDigits);
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset();
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {};
  var array = dateString.split(parseTokenDateTimeDelimeter);
  var timeString;

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits];
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = parseTokenHH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString);
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

var parse_1 = parse;

/**
 * Converts {dirtyDate} to an iso8601 formated string
 * @param {Date|String|Number} dirtyDate
 * @returns {String}
 */
function toISOString() {
  var dirtyDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var date = parse_1(dirtyDate);
  return date.toISOString();
}

var dates = /*#__PURE__*/Object.freeze({
  toISOString: toISOString
});

export { authentication as Auth, analytics as Analytics, dates as Dates };
