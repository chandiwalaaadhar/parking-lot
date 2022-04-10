const readLine = require("readline"),
  Parking = require("../modules/parkingLot.js");

const parkingLot = new Parking(); // new parking Object created

/**
 *
 * @description function for user input from console
 */
function openInteractiveConsole() {
  var prompts = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  prompts.question("Please Enter the Command: ", function (input) {
    processUserCommands(input);
  });
}

/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLot class based on commands
 */
function processUserCommands(input) {
  var userCommand = input.split(" ")[0],
    totalParkingSlots,
    parkingSlotNumber,
    parkingSlotNumbers;
  switch (userCommand) {
    case "create_parking_lot":
      try {
        totalParkingSlots = parkingLot.createNewParkingLot(input);
        console.log(
          "Created a parking lot with " + totalParkingSlots + " slots."
        );
      } catch (err) {
        console.log(err.message);
      }

      break;
    case "park":
      try {
        parkingSlotNumber = parkingLot.parkCar(input);
        console.log("Allocated slot number: " + parkingSlotNumber);
      } catch (err) {
        console.log(err.message);
      }
      break;
    case "leave":
      try {
        parkingSlotNumber = parkingLot.leaveCar(input);
        console.log("Slot number " + parkingSlotNumber + " is free.");
      } catch (err) {
        console.log(err.message);
      }
      break;
    case "status":
      try {
        var parkingSlotStatus = parkingLot.getParkingStatus();
        if (parkingSlotStatus.length > 1) {
          console.log(parkingSlotStatus.join("\n"));
        } else {
          console.log("Sorry, parking lot is empty");
        }
      } catch (err) {
        console.log(err.message);
      }
      break;
    case "registration_numbers_for_cars_with_colour":
      var registrationNumbers = parkingLot.getCarsWithSameColor(input);
      if (registrationNumbers) {
        console.log(registrationNumbers);
      } else {
        console.log("Sorry, Car with given color is not found");
      }
      break;
    case "slot_numbers_for_cars_with_colour":
      parkingSlotNumbers = parkingLot.getSlotsWithSameColorCar(input);
      if (parkingSlotNumbers) {
        console.log(parkingSlotNumbers);
      } else {
        console.log("Sorry, Car with given color is not found");
      }
      break;
    case "slot_number_for_registration_number":
      parkingSlotNumber = parkingLot.getSlotByCarNumber(input);
      if (parkingSlotNumber) {
        console.log(parkingSlotNumber);
      } else {
        console.log("Sorry, Car with given registration number is not found");
      }
      break;
    case "exit":
      process.exit(0);
      break;
    default:
      console.log(input, "is an invalid command");
      break;
  }
  openInteractiveConsole();
}

module.exports = { openInteractiveConsole, processUserCommands };
