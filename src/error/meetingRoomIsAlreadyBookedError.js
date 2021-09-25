class MeetingRoomIsAlreadyBookedError extends Error {
  constructor() {
    super();
    this._message = "NO_VACANT_ROOM";
  }

  get message() {
    return this._message;
  }
}

module.exports = MeetingRoomIsAlreadyBookedError;
