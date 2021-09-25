const {NoMeetingRoomAvailableError} = require("./error/index");

class BookingManager {
  constructor(meetingRooms = [], cleaningRoomTimeSlots = []) {
    this._meetingRooms = meetingRooms.sort((meetingRoom, anotherMeetingRoom) =>
      meetingRoom.getCapacityDifference(anotherMeetingRoom)
    );
    this._cleaningRoomTimeSlots = cleaningRoomTimeSlots;
  }

  _isOverlappingWithBufferTime(timeSlot){
    return this._cleaningRoomTimeSlots.find(slot => slot.isOverlappingWith(timeSlot));
  }

  getAllAvailableMeetingRooms(timeSlot, headsCount=0) {
    if (this._isOverlappingWithBufferTime(timeSlot)) {
      throw new NoMeetingRoomAvailableError();
    }

    return this._meetingRooms.filter((meetingRoom) =>
      meetingRoom.hasCapacityOf(headsCount) &&
      meetingRoom.isAvailableFor(timeSlot)
    );
  }

  bookAMeetingRoom(timeSlot, headsCount) {
    const meetingRoom = this.getAllAvailableMeetingRooms(timeSlot, headsCount)[0] || null;
    if (!meetingRoom) {
      throw new NoMeetingRoomAvailableError();
    }
    meetingRoom.book(timeSlot);
    return meetingRoom;
  }
}

module.exports = BookingManager;