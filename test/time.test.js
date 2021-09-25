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
    const twentyThreeHours = Time.create('23:00');
    const twelveHoursAndTweleveMinutes = Time.create('12:12');

    const result = twentyThreeHours.isGreaterThan(twelveHoursAndTweleveMinutes);
    expect(result).toBeTruthy();
  });

  it("should return false when 16 hr and 21 m is not greater than 17hr and 20m", () => {
    const seventyHoursAndTwentyMinutes = Time.create("17:20");
    const sixteenHoursAndTwentyOneMinutes = Time.create("16:21");

    const result = sixteenHoursAndTwentyOneMinutes.isGreaterThan(seventyHoursAndTwentyMinutes);
    expect(result).toBeFalsy();
  });

  it("should return false when 23 hr and 00 m is not greater than 23hr and 01m", () => {
    const twentyThreeHoursAndOneSecond = Time.create("23:01");
    const twentyThreeHours = Time.create("20:00");

    const result = twentyThreeHours.isGreaterThan(twentyThreeHoursAndOneSecond);
    expect(result).toBeFalsy();
  });
});

describe('isLessThan', () => {
  it("should return true when 12hr and 12m is less than 23hr and 00m", () => {
    const twelveHours = Time.create("12:12");
    const twentyThreeHours = Time.create("23:00");

    const result = twelveHours.isLessThan(twentyThreeHours);
    expect(result).toBeTruthy();
  });

  it("should return false when 17 hr and 20 m is not less than 16hr and 21m", () => {
    const seventyHoursAndTwentyMinutes = Time.create("17:20");
    const sixteenHoursAndTwentyOneMinutes = Time.create("16:21");

    const result = seventyHoursAndTwentyMinutes.isLessThan(sixteenHoursAndTwentyOneMinutes);
    expect(result).toBeFalsy();
  });

  it("should return false when 23 hr and 01 m is not less than 23hr and 00m", () => {
    const twentyThreeHours = Time.create("23:00");
    const twentyThreeHoursAndOneSecond = Time.create("23:01");

    const result = twentyThreeHoursAndOneSecond.isLessThan(twentyThreeHours);
    expect(result).toBeFalsy();
  });
});

describe('equals', () => {
  it('should return true when given two time slots are same', () => {
    const twentyThreeHours = Time.create("20:00");
    const result = twentyThreeHours.equals(twentyThreeHours);
    expect(result).toBeTruthy();
  });

  it("should return false when given two time slots are not same", () => {
    const twentyThreeHours = Time.create("23:00");
    const twentyThreeHoursAndOneSecond = Time.create("23:01");

    const result = twentyThreeHours.equals(twentyThreeHoursAndOneSecond);
    expect(result).toBeFalsy();
  });

});

describe("isInFifteenMinutesInterval", () => {
  it('should return true when given time is in fifteenMinutesInterval', () => {
    const time = Time.create("14:00");

    expect(time.isInFifteenMinutesInterval()).toBeTruthy();
  });

  it("should return false when given time is not in fifteenMinutesInterval", () => {
    const time = Time.create("14:55");

    expect(time.isInFifteenMinutesInterval()).toBeFalsy();
  });
});