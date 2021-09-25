const BookingManager = require("../src/bookingManager");
const TimeSlot = require("../src/timeSlot");
const Room = require('../src/room');

describe('getAllAvailableMeetingRooms', () => {
  it('should return empty when there are no room for booking', () => {
    const bookingManager = new BookingManager();
    const timeSlot = TimeSlot.create('10:00', '12:00');
    const availableRooms = bookingManager.getAllAvailableMeetingRooms(timeSlot);

    expect(availableRooms).toStrictEqual([]);
  });

   it("should return c-cave, d-tower rooms when there are all rooms available for given time slot", () => {
     const caveRoom = new Room('C-Cave', 3);
     const towerRoom = new Room("D-Tower", 7);

     const bookingManager = new BookingManager([caveRoom, towerRoom]);
     const timeSlot = TimeSlot.create("10:00", "12:00");
     const availableRooms = bookingManager.getAllAvailableMeetingRooms(timeSlot);

     expect(availableRooms).toStrictEqual([caveRoom, towerRoom]);
   });
});