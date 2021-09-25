const { createReadStream } = require("fs");
const readline = require("readline");
const path = require("path");
const createInstruction = require("./src/instruction");
const setup = require("./setup");

const inputFileName = process.argv[2];
const inputFilePath = path.resolve(__dirname, inputFileName || "input.txt");

const bookignManager = setup();

const readInterface = readline.createInterface({
  input: createReadStream(inputFilePath),
});

readInterface.on("line", (line) => {
  if (line) {
    try {
      const instruction = createInstruction(line);
      console.log(instruction.execute(bookignManager));
    } catch (error) {
      console.log(error.message);
    }
  }
});
