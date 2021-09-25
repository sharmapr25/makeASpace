const createInstruction = require("../src/instruction");
const BookingManager = require("../src/bookingManager");
const MeetingRoom = require("../src/meetingRoom");
const TimeSlot = require("../src/timeSlot");
const { InvalidTimeSlotInputError, NoMeetingRoomAvailableError, InvalidTimeInputError, InvalidInstructionError} = require("../src/error/index");

describe('createInstruction', () => {
  it('should throw invalid instruction when given instruction is invalid', () => {
    expect(() => createInstruction('Hello')).toThrow(InvalidInstructionError);
  });
});

describe("GetAllVacantRoomsInstruction", () => {
  it("should return c-cave and d-tower as result when all rooms are available for given time slot", () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const towerRoom = new MeetingRoom("D-Tower", 7);
    const bookingManager = new BookingManager([caveRoom, towerRoom]);
    const instruction = createInstruction("VACANCY 10:00 12:00");
    const expectedMessage = "C-Cave D-Tower";

    const message = instruction.execute(bookingManager);

    expect(message).toBe(expectedMessage);
  });

  it("should throw NoMeetingRoomAvailableError when there no room available", () => {
    const bookingManager = new BookingManager();
    const instruction = createInstruction("VACANCY 10:00 12:00");

    const error = () => instruction.execute(bookingManager);
    expect(error).toThrow(NoMeetingRoomAvailableError);
    expect(error).toThrow("NO_VACANT_ROOM");
  });

  it("should throw InvalidTimeSlotInputError when given time slot has range between two days", () => {
    const bookingManager = new BookingManager();
    const instruction = createInstruction("VACANCY 12:00 00:00");

    const error = () => instruction.execute(bookingManager);

    expect(error).toThrow(InvalidTimeSlotInputError);
    expect(error).toThrow("INCORRECT_INPUT");
  });

  it("should throw InvalidTimeInputError when given time slot end date has more than 24 hr", () => {
    const bookingManager = new BookingManager();
    const instruction = createInstruction("VACANCY 12:00 25:00");

    const error = () => instruction.execute(bookingManager);

    expect(error).toThrow(InvalidTimeInputError);
    expect(error).toThrow("INCORRECT_INPUT");
  });
});

describe('bookARoomInstruction', () => {
  it('should return C-Cave as booked room when it is available for given time slot ', () => {
    const caveRoom = new MeetingRoom("C-Cave", 3);
    const bookingManager = new BookingManager([caveRoom]);
    const instruction = createInstruction("BOOK 10:00 12:00 2");
    const expectedMessage = "C-Cave";

    const message = instruction.execute(bookingManager);

    expect(message).toBe(expectedMessage);
  });


 it("should throw NoMeetingRoomAvailableError when there is no capacity given with instruction", () => {
   const caveRoom = new MeetingRoom("C-Cave", 3);
   const bookingManager = new BookingManager([caveRoom]);
   const instruction = createInstruction("BOOK 10:00 12:00");

   const error = () => instruction.execute(bookingManager);

   expect(error).toThrow(NoMeetingRoomAvailableError);
   expect(error).toThrow("NO_VACANT_ROOM");
 });

 it("should throw NoMeetingRoomAvailableError when there is no room available for given heads count", () => {
   const caveRoom = new MeetingRoom("C-Cave", 3);
   const bookingManager = new BookingManager([caveRoom]);
   const instruction = createInstruction("BOOK 10:00 12:00 4");

   const error = () => instruction.execute(bookingManager);

   expect(error).toThrow(NoMeetingRoomAvailableError);
   expect(error).toThrow("NO_VACANT_ROOM");
 });
});