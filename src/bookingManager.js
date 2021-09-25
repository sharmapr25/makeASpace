class BookingManager {
  constructor(meetingRooms = []){
    this._meetingRooms = meetingRooms;
  }

  getAllAvailableMeetingRooms(timeSlot){
    return this._meetingRooms.filter(meetingRoom => meetingRoom.isAvailableFor(timeSlot));
  }
}

module.exports = BookingManager;