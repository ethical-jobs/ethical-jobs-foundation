import { Auth, Analytics, Dates } from '../dist/foundation.esm.js';

test('it exports an Auth module', () => {
  expect(
    Object.keys(Auth).sort()
  ).toEqual([
    'getUserApp',
    'hasAllRoles',
    'hasAnyRole',
    'hasRole',
    'hasToken',
    'isAdmin',
    'isAuthLoaded',
    'isStaffMember',
    'roles',
    'userRolesSelector',
  ]);
});

test('it exports an Analytics module', () => {
  expect(
    Object.keys(Analytics)
  ).toEqual([
    'events',
    'react',
  ]);
});

test('it exports an Dates module', () => {
  expect(
    Object.keys(Dates)
  ).toEqual([
    'toISOString'
  ]);
});