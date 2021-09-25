const InvalidTimeInputError = require('./invalidTimeInputError');
const InvalidTimeSlotInputError = require("./invalidTimeSlotInputError");
const MeetingRoomIsAlreadyBookedError = require('./meetingRoomIsAlreadyBookedError');

module.exports = [InvalidTimeInputError, InvalidTimeSlotInputError, MeetingRoomIsAlreadyBookedError];