const MeetingRoomIsAlreadyBookedError = require("./error/meetingRoomIsAlreadyBookedError");

class MeetingRoom {
  constructor(name, capacity) {
    this._name = name;
    this._capacity = capacity;
    this._bookedSlots = [];
  }

  book(timeSlot) {
    if (!this.isAvailableFor(timeSlot)) {
      throw new MeetingRoomIsAlreadyBookedError();
    }
    this._bookedSlots.push(timeSlot);
  }

  isAvailableFor(timeSlot) {
    return !this._bookedSlots.find(bookedSlot => bookedSlot.isOverlappingWith(timeSlot));
  }

  hasCapacityOf(headsCount) {
    return this._capacity >= headsCount;
  }

  getCapacityDifference(anotherMeetingRoom){
    return this._capacity - anotherMeetingRoom._capacity;
  }
}

module.exports = MeetingRoom;