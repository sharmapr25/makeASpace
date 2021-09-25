const assert = require("assert");
const { InvalidTimeSlotInputError } = require("../src/error/index");
const Time = require("../src/time");
const TimeSlot = require("../src/timeSlot");
const assertError = require("./lib/errorAssertion");

describe("create", () => {
  it("should create a new slot with given valid start and end time", () => {
    const expectedTimeSlot = new TimeSlot(
      Time.create("10:00"),
      Time.create("12:00")
    );

    const timeSlot = TimeSlot.create("10:00", "12:00");
    assert.deepEqual(timeSlot, expectedTimeSlot);
  });

  it("should throw invalid input error when start time is greater than end time", () => {
    const error = () => TimeSlot.create("23:00", "01:00");

    assertError(error, InvalidTimeSlotInputError, "INCORRECT_INPUT");
  });

  it("should throw invalid input error when start time is not in fifteen minutes interval ", () => {
    const error = () => TimeSlot.create("12:55", "14:00");

    assertError(error, InvalidTimeSlotInputError, "INCORRECT_INPUT");
  });
  
});

describe("isOverlappingWith", () => {
  it("should return true when given two time slots are not same", () => {
    const timeslot = TimeSlot.create("10:00", "12:00");

    assert.ok(timeslot.isOverlappingWith(timeslot));
  });

  it("should return true when given time slot is 11hr to 12hr that overlap with 10hr to 12hr", () => {
    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
    const elevenHoursToTweleveHours = TimeSlot.create("11:00", "12:00");

    assert.ok(tenHoursToTweleveHours.isOverlappingWith(elevenHoursToTweleveHours));
  });

  it("should return true when given time slot is 9hr to 12hr that overlap with 10hr to 12hr", () => {
    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
    const nineHoursToTweleveHours = TimeSlot.create("9:00", "12:00");

    assert.ok(tenHoursToTweleveHours.isOverlappingWith(nineHoursToTweleveHours));
  });

  it("should return true when given time slot is 9hr to 12hr that overlap with 10hr to 12hr", () => {
    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
    const nineHoursToTweleveHours = TimeSlot.create("9:00", "12:00");

    assert.ok(tenHoursToTweleveHours.isOverlappingWith(nineHoursToTweleveHours));
  });

  it("should return false when given time slot is 12hr to 13hr that not overlapping with 10hr to 12hr", () => {
    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
    const tweleveHoursToThirteenHours = TimeSlot.create("12:00", "13:00");

    assert.ok(!tenHoursToTweleveHours.isOverlappingWith(tweleveHoursToThirteenHours));
  });

  it("should return false when given time slot is 9hr to 10hr that not overlapping with 10hr to 12hr", () => {
    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");
    const nineHoursToTenHours = TimeSlot.create("9:00", "10:00");

    assert.ok(!tenHoursToTweleveHours.isOverlappingWith(nineHoursToTenHours));
  });
});
