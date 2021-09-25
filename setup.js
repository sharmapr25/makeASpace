const BookingManager = require("./src/bookingManager");
const MeetingRoom = require("./src/meetingRoom");
const TimeSlot = require("./src/timeSlot");

const caveRoom = new MeetingRoom("C-Cave", 3);
const towerRoom = new MeetingRoom("D-Tower", 7);
const mansionRoom = new MeetingRoom("G-Mansion", 20);

const meetingRooms = [caveRoom, towerRoom, mansionRoom];

const nineHoursToNineFifteenHours = TimeSlot.create("09:00", "09:15");
const thirteenHoursToThirteenFortyFiveHours = TimeSlot.create("13:15", "13:45");
const eighteenFortyFiveHoursToNinteenHours = TimeSlot.create("18:45", "19:00");

const bufferTime = [nineHoursToNineFifteenHours, thirteenHoursToThirteenFortyFiveHours, eighteenFortyFiveHoursToNinteenHours];

const bookingManager = new BookingManager(meetingRooms, bufferTime);
module.exports = () => bookingManager;
