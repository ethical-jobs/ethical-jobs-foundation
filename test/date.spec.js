import { Dates } from '../src';

describe('toISOString function', () => {

  test('it always returns a string', () => {
    expect(
      typeof Dates.toISOString(new Date)
    ).toBe('string');
  });

  test('it returns current date when param is empty', () => {
    const currentYear = (new Date).getFullYear().toString();
    expect(
      Dates.toISOString()
    ).toEqual(
      expect.stringContaining(currentYear)
    );
  });

  test('it formats string into ISO8601 complient date', () => {
    expect(
      Dates.toISOString(new Date('05 October 2011 14:48 UTC'))
    ).toBe('2011-10-05T14:48:00.000Z');
  });

  test('it also handles string input', () => {
    expect(
      Dates.toISOString('2011/10/05 14:48 UTC')
    ).toBe('2011-10-05T14:48:00.000Z');
  });

  test('it also handles timestamp input', () => {
    expect(
      Dates.toISOString(1526609035000)
    ).toBe('2018-05-18T02:03:55.000Z');
  });
});
