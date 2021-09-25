class MeetingRoom{
  constructor(name, capacity){
    this._name = name;
    this._capacity = capacity;
    this._bookedSlots = [];
  }

  book(timeSlot){
    this._bookedSlots.push(timeSlot);
  }

  isAvailableFor(timeSlot){
    return !this._bookedSlots.find(bookedSlot => bookedSlot.isOverlappingWith(timeSlot));
  }
}

module.exports = MeetingRoom;