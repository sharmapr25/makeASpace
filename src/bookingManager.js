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

  getAllAvailableMeetingRooms(timeSlot) {
    return this._meetingRooms.filter((meetingRoom) =>
      meetingRoom.isAvailableFor(timeSlot)
    );
  }

  bookAMeetingRoom(timeSlot, headsCount) {
    if(this._isOverlappingWithBufferTime(timeSlot)){
      throw new NoMeetingRoomAvailableError();
    }

    const meetingRoom = this._meetingRooms.find((meetingRoom) =>
      meetingRoom.hasCapacityOf(headsCount) && meetingRoom.isAvailableFor(timeSlot));

    if (!meetingRoom) {
      throw new NoMeetingRoomAvailableError();
    }
    meetingRoom.book(timeSlot);
    return meetingRoom;
  }
}

module.exports = BookingManager;