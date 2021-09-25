const Time = require("../src/time");
const {InvalidTimeInput} = require('../src/error');

describe('create', () => {
  it('should throw invalid time error when given time is 24hr and 12s', () => {
    expect(() => Time.create('24:12')).toThrow(InvalidTimeInput);
  });

  it('should create time with 20 hr and 0 minute when given time is correct', () => {
    const expectedTime = new Time(23, 0);

    const time = Time.create("23:00");
    expect(time).toStrictEqual(expectedTime);
  });

});
describe('isGreaterThan', () => {
  it('should return true when 23 hr and 00 s is greater than 12hr and 12s', () => {
    const twentyThreeHoursTime = Time.create('23:00');
    const twelveHoursTime = Time.create('12:12');

    const result = twentyThreeHoursTime.isGreaterThan(twelveHoursTime);
    expect(result).toBeTruthy();
  });

  it("should return false when 20 hr and 00 s is not greater than 23hr and 00s", () => {
    const twentyThreeHoursTime = Time.create("23:00");
    const twentyHoursTime = Time.create("20:00");

    const result = twentyHoursTime.isGreaterThan(twentyThreeHoursTime);
    expect(result).toBeFalsy();
  });

  it("should return false when 23 hr and 00 s is not greater than 23hr and 01s", () => {
    const twentyThreeHoursAndOneSecondTime = Time.create("23:01");
    const twentyThreeHoursTime = Time.create("20:00");

    const result = twentyThreeHoursTime.isGreaterThan(twentyThreeHoursAndOneSecondTime);
    expect(result).toBeFalsy();
  });
});