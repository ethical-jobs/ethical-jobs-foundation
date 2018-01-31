import Immutable from 'immutable';

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
    return roles.every(role => user.get('roles').includes(role)) &&
      user.get('roles').every(role => roles.includes(role));
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
    return roles.every(role => user.get('roles').includes(role)) ||
      user.get('roles').every(role => roles.includes(role));
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

export default {
  hasToken,
  isAuthLoaded,
  hasRole,
  hasAllRoles,
  hasAnyRole,
  isAdmin,
  isStaffMember,
  getUserApp,
  userRolesSelector,
};