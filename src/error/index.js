const InvalidTimeInputError = require('./invalidTimeInputError');
const InvalidTimeSlotInputError = require("./invalidTimeSlotInputError");
const MeetingRoomIsAlreadyBookedError = require('./meetingRoomIsAlreadyBookedError');
const NoMeetingRoomAvailableError = require('./noMeetingRoomAvailableError');

module.exports = [InvalidTimeInputError, InvalidTimeSlotInputError, MeetingRoomIsAlreadyBookedError, NoMeetingRoomAvailableError];