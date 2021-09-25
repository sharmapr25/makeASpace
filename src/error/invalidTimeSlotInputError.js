class InvalidTimeSlotInputError extends Error{
  constructor(){
    super();
    this._message = "INCORRECT_INPUT";
  }

  get message(){
    return this._message;
  }
}

module.exports = InvalidTimeSlotInputError;