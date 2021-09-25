const InvalidTimeSlotInputError = require('./error/invalidTimeSlotInputError');
const Time = require('./time');

class TimeSlot{
  constructor(startDate, endDate){
    this._startDate = startDate;
    this._endDate = endDate;
  }

  static create(startInput, endInput){
    const startTime = Time.create(startInput);
    const endTime = Time.create(endInput);
    if(startTime.isGreaterThan(endTime)){
      throw new InvalidTimeSlotInputError();
    }
    return new TimeSlot(startTime, endTime);
  }
}

module.exports = TimeSlot;