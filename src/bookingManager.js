const NoMeetingRoomAvailableError = require("./error/noMeetingRoomAvailableError");

class BookingManager {
  constructor(meetingRooms = []) {
    this._meetingRooms = meetingRooms.sort((meetingRoom, anotherMeetingRoom) => meetingRoom.getCapacityDifference(anotherMeetingRoom));
  }

  getAllAvailableMeetingRooms(timeSlot) {
    return this._meetingRooms.filter(meetingRoom => meetingRoom.isAvailableFor(timeSlot));
  }

  bookAMeetingRoom(timeSlot, headsCount){
    const meetingRoom = this._meetingRooms.find(meetingRoom => meetingRoom.hasCapacityOf(headsCount) && meetingRoom.isAvailableFor(timeSlot));
    if(!meetingRoom){
      throw new NoMeetingRoomAvailableError();
    }
    meetingRoom.book(timeSlot);
    return meetingRoom;
  }
}

module.exports = BookingManager;