const {InvalidTimeSlotInputError} = require('../src/error/index');
const Time = require('../src/time');
const TimeSlot = require('../src/timeSlot');

describe('create', () => {
  it('should create a new slot with given valid start and end time', () => {
    const expectedTimeSlot = new TimeSlot(
      Time.create("10:00"),
      Time.create("12:00")
    );

    const timeSlot = TimeSlot.create('10:00', '12:00');
    expect(timeSlot).toStrictEqual(expectedTimeSlot);
  })

  it("should throw invalid input error when start time is greater than end time", () => {
    const error = () => TimeSlot.create("23:00", "01:00");

    expect(error).toThrow(InvalidTimeSlotInputError);
  });

  it("should throw invalid input error when start time is not in fifteen minutes interval ", () => {
    const error = () => TimeSlot.create("12:55", "14:00");

    expect(error).toThrow(InvalidTimeSlotInputError);
  });
});

describe('isOverlappingWith', () => {
  it("should return true when given two time slots are not same", () => {
    const timeslot = TimeSlot.create("10:00", "12:00");

    expect(timeslot.isOverlappingWith(timeslot)).toBeTruthy();
  });

  it("should return true when given time slot is 11hr to 12hr that overlap with 10hr to 12hr", () => {
    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
    const elevenHoursToTweleveHours = TimeSlot.create("11:00", "12:00");

    expect(tenHoursToTweleveHours.isOverlappingWith(elevenHoursToTweleveHours)).toBeTruthy();
  });

  it("should return true when given time slot is 9hr to 12hr that overlap with 10hr to 12hr", () => {
    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
    const nineHoursToTweleveHours = TimeSlot.create("9:00", "12:00");

    expect(
      tenHoursToTweleveHours.isOverlappingWith(nineHoursToTweleveHours)
    ).toBeTruthy();
  });

 it("should return true when given time slot is 9hr to 12hr that overlap with 10hr to 12hr", () => {
   const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
   const nineHoursToTweleveHours = TimeSlot.create("9:00", "12:00");

   expect(
     tenHoursToTweleveHours.isOverlappingWith(nineHoursToTweleveHours)
   ).toBeTruthy();
 });

 it("should return false when given time slot is 12hr to 13hr that not overlapping with 10hr to 12hr", () => {
   const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
   const tweleveHoursToThirteenHours = TimeSlot.create("12:00", "13:00");

   expect(
     tenHoursToTweleveHours.isOverlappingWith(tweleveHoursToThirteenHours)
   ).toBeFalsy();
 });

 it("should return false when given time slot is 9hr to 10hr that not overlapping with 10hr to 12hr", () => {
   const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
   const nineHoursToTenHours = TimeSlot.create("9:00", "10:00");

   expect(
     tenHoursToTweleveHours.isOverlappingWith(nineHoursToTenHours)
   ).toBeFalsy();
 });

});