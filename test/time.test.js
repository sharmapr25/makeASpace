const Time = require("../src/time");
const {InvalidTimeInputError} = require('../src/error/index');

describe('create', () => {
  it('should throw invalid time error when given time is 24hr and 00m', () => {
    expect(() => Time.create('24:00')).toThrow(InvalidTimeInputError);
  });

   it("should throw invalid time error when given time minutes are more than 60", () => {
     expect(() => Time.create("23:61")).toThrow(InvalidTimeInputError);
   });

  it('should create time with 20 hr and 0 minute when given time is correct', () => {
    const expectedTime = new Time(23, 0);

    const time = Time.create("23:00");
    expect(time).toStrictEqual(expectedTime);
  });

});
describe('isGreaterThan', () => {
  it('should return true when 23 hr and 00 m is greater than 12hr and 12m', () => {
    const twentyThreeHoursTime = Time.create('23:00');
    const twelveHoursTime = Time.create('12:12');

    const result = twentyThreeHoursTime.isGreaterThan(twelveHoursTime);
    expect(result).toBeTruthy();
  });

  it("should return false when 20 hr and 00 m is not greater than 23hr and 00m", () => {
    const twentyThreeHoursTime = Time.create("23:00");
    const twentyHoursTime = Time.create("20:00");

    const result = twentyHoursTime.isGreaterThan(twentyThreeHoursTime);
    expect(result).toBeFalsy();
  });

  it("should return false when 23 hr and 00 m is not greater than 23hr and 01m", () => {
    const twentyThreeHoursAndOneSecondTime = Time.create("23:01");
    const twentyThreeHoursTime = Time.create("20:00");

    const result = twentyThreeHoursTime.isGreaterThan(twentyThreeHoursAndOneSecondTime);
    expect(result).toBeFalsy();
  });
});