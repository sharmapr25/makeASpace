const MeetingRoom = require("../src/meetingRoom");
const TimeSlot = require("../src/timeSlot");

describe('isAvailableFor', () => {
  it('should return true when given room is available for given timeslot', ()=> {
    const caveRoom = new MeetingRoom('C-Cave', 2);
    const timeSlot = TimeSlot.create("10:00", "12:00");

    expect(caveRoom.isAvailableFor(timeSlot)).toBeTruthy();
  })

  it("should return false when given room is already book for given timeslot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    caveRoom.book(timeSlot);

    expect(caveRoom.isAvailableFor(timeSlot)).toBeFalsy();

   });

  it("should return false when given room is book for different time slot and it is overlapping with given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const nineHoursToTweleveHours = TimeSlot.create("9:00", "12:00");
    caveRoom.book(nineHoursToTweleveHours);

    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");

    expect(caveRoom.isAvailableFor(tenHoursToTweleveHours)).toBeFalsy();
  });

  it("should return true when given room is book for different time slot and it is not overlapping with given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 2);
    const nineHoursToTenHours = TimeSlot.create("9:00", "10:00");
    caveRoom.book(nineHoursToTenHours);

    const tenHoursToTweleveHours = TimeSlot.create("10:00", "12:00");

    expect(caveRoom.isAvailableFor(tenHoursToTweleveHours)).toBeTruthy();
 });
});