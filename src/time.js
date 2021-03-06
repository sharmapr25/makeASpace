const {InvalidTimeInputError} = require('./error/index.js') ;

const COLON_DELIMITER = ":";

class Time {
  constructor(hours, minutes) {
    this._hours = hours;
    this._minutes = minutes;
  }

  isGreaterThan(anotherTime) {
    return (
      this._hours > anotherTime._hours ||
      (this._hours === anotherTime._hours &&
        this._minutes > anotherTime._minutes)
    );
  }

  isLessThan(anotherTime) {
    return (
      this._hours < anotherTime._hours ||
      (this._hours === anotherTime._hours &&
        this._minutes < anotherTime._minutes)
    );
  }

  equals(anotherTime) {
    return (
      this._hours === anotherTime._hours &&
      this._minutes === anotherTime._minutes
    );
  }

  isInFifteenMinutesInterval(){
    return ((this._minutes%15) === 0);
  }

  static create(timeInput) {
    const [hours, minutes] = timeInput
      .split(COLON_DELIMITER)
      .map((input) => parseInt(input));
    if (hours > 23 || minutes > 60) {
      throw new InvalidTimeInputError();
    }
    return new Time(hours, minutes);
  }
}

module.exports = Time;