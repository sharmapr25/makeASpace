const assert = require("assert");
const assertError = require("./lib/errorAssertion");
const { MeetingRoomIsAlreadyBookedError } = require("../src/error/index");
const MeetingRoom = require("../src/meetingRoom");
const TimeSlot = require("../src/timeSlot");

describe("isAvailableFor", () => {
  it("should return true when given room is available for given timeslot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const timeSlot = TimeSlot.create("10:00", "12:00");

    assert.ok(caveRoom.isAvailableFor(timeSlot));
  });

  it("should return false when given room is already book for given timeslot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    caveRoom.book(timeSlot);

    assert.ok(!caveRoom.isAvailableFor(timeSlot))
  });

  it("should return false when given room is book for different time slot and it is overlapping with given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const nineHoursToTweleveHours = TimeSlot.create("9:00", "12:00");
    caveRoom.book(nineHoursToTweleveHours);

    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");

    assert.ok(!caveRoom.isAvailableFor(tenHoursToTweleveHours))
  });

  it("should return true when given room is book for different time slot and it is not overlapping with given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const nineHoursToTenHours = TimeSlot.create("9:00", "10:00");
    caveRoom.book(nineHoursToTenHours);

    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");

    assert.ok(caveRoom.isAvailableFor(tenHoursToTweleveHours));
  });
});

describe("book", () => {
  it("should book room when it is available for given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const timeSlot = TimeSlot.create("9:00", "10:00");

    assert.ok(caveRoom.isAvailableFor(timeSlot));

    caveRoom.book(timeSlot);

    assert.ok(!caveRoom.isAvailableFor(timeSlot))
  });

  it("should throw meeting room is already book error when room is already booked for given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const nineHoursToTenHours = TimeSlot.create("9:00", "10:00");
    caveRoom.book(nineHoursToTenHours);

    const nineHoursThirtyMinutesToTenHours = TimeSlot.create("9:30", "10:00");

    assertError(
      () => caveRoom.book(nineHoursThirtyMinutesToTenHours), MeetingRoomIsAlreadyBookedError
    );
  });
});

describe("hasCapacity", () => {
  it("should return true when given heads count is same as room capacity", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);

    assert.ok(caveRoom.hasCapacityOf(2));
  });

  it("should return true when given heads count is less than room capacity", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);

    assert.ok(caveRoom.hasCapacityOf(1));
  });

  it("should return false when given heads count is more than room capacity", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);

    assert.ok(!caveRoom.hasCapacityOf(4))
  });
});

describe("getCapacityDifference", () => {
  it("should return 5 when there are space differecne between give two rooms", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const towerRoom = new MeetingRoom("D-Tower", 7);

    assert.equal(towerRoom.getCapacityDifference(caveRoom), 5);
  });

  it("should return 0 when there are no space differecne between give two rooms", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const anotherCaveRoom = new MeetingRoom("D-Cave", 2);

    assert.equal(caveRoom.getCapacityDifference(anotherCaveRoom), 0);
  });
});
