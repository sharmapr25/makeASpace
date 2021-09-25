const { NoMeetingRoomAvailableError, InvalidInstructionError } = require("./error/index");
const TimeSlot = require("./timeSlot");

class GetAllVacantRoomsInstruction{
  constructor([startTime, endTime]){
    this._startTime = startTime;
    this._endTime = endTime;
  }

  execute(bookingManager){
    const timeSlot = TimeSlot.create(this._startTime, this._endTime);
    const availableRooms = bookingManager.getAllAvailableMeetingRooms(timeSlot);
    if(availableRooms.length == 0){
      throw new NoMeetingRoomAvailableError();
    }
    return availableRooms.map(room => room.name).join(" ");
  }
}

class BookARoomInstruction{
  constructor([startTime, endTime, headsCount]){
    this._startTime = startTime;
    this._endTime = endTime;
    this._headsCount = parseInt(headsCount);
  }

  execute(bookingManager){
    const timeSlot = TimeSlot.create(this._startTime, this._endTime);
    const bookedRoom = bookingManager.bookAMeetingRoom(timeSlot, this._headsCount);
    return bookedRoom && bookedRoom.name;
  }
}


const SPACE_DELIMITER = " ";
const instructions = {
  VACANCY: GetAllVacantRoomsInstruction,
  BOOK: BookARoomInstruction,
};

const createInstruction = (input) => {
  const [command, ...params] = input.split(SPACE_DELIMITER);
  const instruction = instructions[command.toUpperCase()];
  if(!instruction){
    throw new InvalidInstructionError();
  }
  return new instruction(params);
};

module.exports = createInstruction;