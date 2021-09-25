const InvalidTimeSlotInputError = require('./error/invalidTimeSlotInputError');
const Time = require('./time');

class TimeSlot {
  constructor(startDate, endDate) {
    this._startDate = startDate;
    this._endDate = endDate;
  }

  _isOverlappingWithStartDate(anotherTimeSlot) {
    return (
      anotherTimeSlot._startDate.isLessThan(this._startDate) &&
      anotherTimeSlot._endDate.isGreaterThan(this._startDate)
    );
  }

  _isOverlappingWithEndDate(anotherTimeSlot) {
    return (
      anotherTimeSlot._startDate.isGreaterThan(this._startDate) &&
      anotherTimeSlot._startDate.isLessThan(this._endDate)
    );
  }

  isOverlappingWith(anotherTimeSlot) {
    return (
      this._isOverlappingWithStartDate(anotherTimeSlot) ||
      this._isOverlappingWithEndDate(anotherTimeSlot) || anotherTimeSlot._startDate.isSame(this._startDate)
    );
  }

  static create(startInput, endInput) {
    const startTime = Time.create(startInput);
    const endTime = Time.create(endInput);

    if (startTime.isGreaterThan(endTime)) {
      throw new InvalidTimeSlotInputError();
    }
    return new TimeSlot(startTime, endTime);
  }
}

module.exports = TimeSlot;