import { Auth, Analytics, Dates } from '../src';

test('it exports an Auth module', () => {
  expect(
    Object.keys(Auth)
  ).toEqual([
    'hasToken',
    'isAuthLoaded',
    'hasRole',
    'hasAllRoles',
    'hasAnyRole',
    'isAdmin',
    'isStaffMember',
    'getUserApp',
    'userRolesSelector',
    'roles',
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