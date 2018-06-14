import parse from 'date-fns/parse';

/**
 * Converts {dirtyDate} to an iso8601 formated string
 * @param {Date|String|Number} dirtyDate
 * @returns {String}
 */
export function toISOString(dirtyDate) {
  const date = parse(dirtyDate);
  return date.toISOString();
}