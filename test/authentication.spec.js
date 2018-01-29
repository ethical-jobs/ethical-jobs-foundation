import Immutable from 'immutable';
import { Auth } from '..';

/**
 * ----------------------------------------
 */
describe('hasToken function', () => {

  test('it returns true when a token is present', () => {
    localStorage.setItem('_token', 'mock-jwt-token');
    expect(Auth.hasToken()).toBe(true);
  });

  test('it returns false when a token is absent', () => {
    localStorage.clear();
    expect(Auth.hasToken()).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('isAuthLoaded function', () => {

  test('it returns true if there is a token and a user', () => {
    const user = Immutable.Map({ name: 'Bill Harzia' });
    localStorage.setItem('_token', 'mock-jwt-token');
    expect(Auth.isAuthLoaded(user)).toBe(true);
  });

  test('it returns false if there is a token and no user', () => {
    const user = Immutable.Map();
    localStorage.setItem('_token', 'mock-jwt-token');
    expect(Auth.isAuthLoaded()).toBe(false);
  });

  test('it returns false if there is no token and is a user', () => {
    const user = Immutable.Map({ name: 'Bill Harzia' });
    localStorage.clear();
    expect(Auth.isAuthLoaded(user)).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('hasRole function', () => {

  test('it returns true if user has {role}', () => {
    const user = Immutable.fromJS({
      name: 'BIll Harzia',
      roles: ['staff-member','relations-team'],
    });
    expect(Auth.hasRole(user, 'relations-team')).toBe(true);
  });

  test('it returns false if user is missing {role}', () => {
    const user = Immutable.fromJS({
      name: 'BIll Harzia',
      roles: ['staff-member','relations-team'],
    });
    expect(Auth.hasRole(user, 'service-account')).toBe(false);
  });

  test('it returns false if user does not have roles property', () => {
    const user = Immutable.fromJS({
      name: 'BIll Harzia',
    });
    expect(Auth.hasRole(user, 'service-account')).toBe(false);
  });

  test('it returns false if user is empty', () => {
    expect(Auth.hasRole(null, 'service-account')).toBe(false);
    expect(Auth.hasRole(undefined, 'service-account')).toBe(false);
    expect(Auth.hasRole(Immutable.fromJS(), 'service-account')).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('hasAllRoles function', () => {

  test('it returns true if user has {roles}', () => {
    const user = Immutable.fromJS({
      name: 'BIll Harzia',
      roles: ['staff-member','relations-team'],
    });
    const roles = ['staff-member','relations-team'];
    expect(Auth.hasAllRoles(user, roles)).toBe(true);
  });

  test('it returns false if {user.roles} is missing a {roles}', () => {
    const user = Immutable.fromJS({
      name: 'BIll Harzia',
      roles: ['staff-member'],
    });
    const roles = ['staff-member','relations-team'];
    expect(Auth.hasAllRoles(user, roles)).toBe(false);
  });

  test('it returns false if {roles} is missing a {user.roles}', () => {
    const user = Immutable.fromJS({
      name: 'BIll Harzia',
      roles: ['staff-member','relations-team'],
    });
    const roles = ['staff-member'];
    expect(Auth.hasAllRoles(user, roles)).toBe(false);
  });

  test('it returns false if user is empty', () => {
    const roles = ['staff-member'];
    expect(Auth.hasAllRoles(null, roles)).toBe(false);
    expect(Auth.hasAllRoles(undefined, roles)).toBe(false);
    expect(Auth.hasAllRoles(Immutable.fromJS(), roles)).toBe(false);
  });

  test('it returns false if roles is empty', () => {
    const user = Immutable.fromJS({
      name: 'BIll Harzia',
      roles: ['staff-member','relations-team'],
    });
    expect(Auth.hasAllRoles(user, [])).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('hasAnyRole function', () => {

  test('it returns true if user has any (1) {roles}', () => {
    const user = Immutable.fromJS({roles: ['staff-member','relations-team','service-account']});
    expect(Auth.hasAnyRole(user, ['staff-member','relations-team'])).toBe(true);
  });

  test('it returns true if user has any (2) {roles}', () => {
    const user = Immutable.fromJS({roles: ['staff-member']});
    expect(Auth.hasAnyRole(user, ['staff-member','relations-team','service-account'])).toBe(true);
  });

  test('it returns false if user has no {roles}', () => {
    const user = Immutable.fromJS({roles: ['staff-member','relations-team','service-account']});
    expect(Auth.hasAnyRole(user, ['admin'])).toBe(false);
  });

  test('it returns false if user is empty', () => {
    expect(Auth.hasAnyRole(null, ['staff-member'])).toBe(false);
    expect(Auth.hasAnyRole(undefined, ['staff-member'])).toBe(false);
    expect(Auth.hasAnyRole(Immutable.fromJS(), ['staff-member'])).toBe(false);
  });

  test('it returns false if roles is empty', () => {
    const user = Immutable.fromJS({roles: ['staff-member','relations-team']});
    expect(Auth.hasAllRoles(user, [])).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('isAdmin function', () => {

  test('it returns true if user has admin role', () => {
    const user = Immutable.fromJS({
      roles: ['admin']
    });
    expect(Auth.isAdmin(user)).toBe(true);
  });

  test('it returns false if user does not have admin role', () => {
    const user = Immutable.fromJS({
      roles: ['staff-member']
    });
    expect(Auth.isAdmin(user)).toBe(false);
  });
});

/**
 * ----------------------------------------
 */
describe('isStaffMember function', () => {

  test('it returns true if user has staff-member role', () => {
    const user = Immutable.fromJS({
      roles: ['staff-member']
    });
    expect(Auth.isStaffMember(user)).toBe(true);
  });

  test('it returns false if user does not have staff-member role', () => {
    const user = Immutable.fromJS({
      roles: ['job-seeker']
    });
    expect(Auth.isStaffMember(user)).toBe(false);
  });
});


/**
 * ----------------------------------------
 */
describe('getUserApp function', () => {

  test('it returns staff route if user is a staff-member', () => {
    const user = Immutable.fromJS({
      roles: ['staff-member']
    });
    expect(Auth.getUserApp(user)).toBe('/admin');
  });

  test('it returns employer route if user is a employer-member', () => {
    const user = Immutable.fromJS({
      roles: ['employer-member']
    });
    expect(Auth.getUserApp(user)).toBe('/organisation');
  });

  test('it returns employer route if user is not a staff-member', () => {
    const user = Immutable.fromJS({
      roles: ['some-mock-role']
    });
    expect(Auth.getUserApp(user)).toBe('/organisation');
  });
});