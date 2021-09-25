const {InvalidTimeSlotInputError} = require('../src/error/index');
const Time = require('../src/time');
const TimeSlot = require('../src/timeSlot');

describe('create', () => {
  it('should create a new slot with given valid start and end time', () => {
    const expectedTimeSlot = new TimeSlot(
      Time.create("10:00"),
      Time.create("12:00")
    );

    const timeSlot = TimeSlot.create('10:00', '12:00');
    expect(timeSlot).toStrictEqual(expectedTimeSlot);
  })

  it("should throw invalid input error when start time is greater than end time", () => {
    const error = () => TimeSlot.create("24:00", "01:00");

    expect(error).toThrow(InvalidTimeSlotInputError);
  });
});