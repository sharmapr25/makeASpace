class BookingManager {
  constructor(rooms = []){
    this._rooms = rooms;
  }

  getAllAvailableMeetingRooms(timeSlot){
    return this._rooms;
  }
}

module.exports = BookingManager;