const BookingManager = require("../src/bookingManager");
const TimeSlot = require("../src/timeSlot");
const MeetingRoom = require('../src/meetingRoom');
const NoMeetingRoomAvailableError = require("../src/error/noMeetingRoomAvailableError");

describe('getAllAvailableMeetingRooms', () => {
  it('should return empty when there are no room for booking', () => {
    const bookingManager = new BookingManager();
    const timeSlot = TimeSlot.create('10:00', '12:00');
    const availableRooms = bookingManager.getAllAvailableMeetingRooms(timeSlot);

    expect(availableRooms).toStrictEqual([]);
  });

  it("should return c-cave, d-tower rooms when there are all rooms available for given time slot", () => {
    const caveRoom = new MeetingRoom('C-Cave', 3);
    const towerRoom = new MeetingRoom("D-Tower", 7);

    const bookingManager = new BookingManager([caveRoom, towerRoom]);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    const availableRooms = bookingManager.getAllAvailableMeetingRooms(timeSlot);

    expect(availableRooms).toStrictEqual([caveRoom, towerRoom]);
  });

  it("should return c-cave room when d-tower room is already booked for given slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const towerRoom = new MeetingRoom("D-Tower", 7);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    const bookingManager = new BookingManager([caveRoom, towerRoom]);

    towerRoom.book(timeSlot);

    const availableRooms = bookingManager.getAllAvailableMeetingRooms(timeSlot);

    expect(availableRooms).toStrictEqual([caveRoom]);
  });

});


describe('bookAMeetingRoom', () => {
  it('should return c-cave when asked for book a room with given timeslot and heads count of 2', () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const towerRoom = new MeetingRoom("D-Tower", 7);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    const bookingManager = new BookingManager([caveRoom, towerRoom]);

    const meetingRoom = bookingManager.bookAMeetingRoom(timeSlot, 2);

    expect(meetingRoom).toStrictEqual(caveRoom);
  });

  it("should return d-tower when asked for book a room when give headsCount is more than cave room capacity", () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const towerRoom = new MeetingRoom("D-Tower", 7);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    const bookingManager = new BookingManager([caveRoom, towerRoom]);

    const meetingRoom = bookingManager.bookAMeetingRoom(timeSlot, 4);

    expect(meetingRoom).toStrictEqual(towerRoom);
  });

  it("should throw noMeetingRoomAvailableError when no meeting room is available for given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    const bookingManager = new BookingManager([caveRoom]);

    caveRoom.book(timeSlot);

    const error = () =>  bookingManager.bookAMeetingRoom(timeSlot, 3);

    expect(error).toThrow(NoMeetingRoomAvailableError);
  });

  it("should return d-tower when there are three rooms with c-cave status as booked and d-tower has most least capacity require for booking a new room", () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const mansionRoom = new MeetingRoom("G-Mansion", 20);
    const towerRoom = new MeetingRoom("D-Tower", 7);
    const timeSlot = TimeSlot.create("10:00", "12:00");
    const bookingManager = new BookingManager([caveRoom, mansionRoom, towerRoom]);

    bookingManager.bookAMeetingRoom(timeSlot, 3);

    const meetingRoom = bookingManager.bookAMeetingRoom(timeSlot, 3);

    expect(meetingRoom).toStrictEqual(towerRoom);
  });

  it("should throw noMeetingRoomAvailableError try to book a room whose time slot is overlapping with timing for cleaning rooms", () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const towerRoom = new MeetingRoom("D-Tower", 7);
    const cleaningRoomTimeSlots = [TimeSlot.create("9:00", "9:15")]
    const bookingManager = new BookingManager([caveRoom, towerRoom], cleaningRoomTimeSlots);
    const timeSlot = TimeSlot.create("9:00", "12:00");

    const error = () => bookingManager.bookAMeetingRoom(timeSlot, 2);

    expect(error).toThrow(NoMeetingRoomAvailableError);
  });


});