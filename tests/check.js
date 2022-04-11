const assert = require("chai").assert,
  fs = require("fs"),
  Parking = require("../src/modules/parkingLot.js");

var commands = [],
  totalParkings,
  parkingLot = new Parking();

// test specs for unit testing the methods in Parking Lot class
describe("Test for reading input test data", function () {
  it("reading input.txt", function (done) {
    fs.readFile("./file.txt", "utf-8", function (err, data) {
      if (err) {
        throw "Unable to read input test file";
      }
      commands = JSON.parse(JSON.stringify(data)).split("\n");
      done();
    });
  });

  it("checking commands", function (done) {
    assert.equal(commands[0].split(" ")[0], "create_parking_lot");
    assert.equal(commands[1].split(" ")[0], "park");
    assert.equal(commands[7].split(" ")[0], "leave");
    assert.equal(commands[8], "status");
    done();
  });
});

// unit tests for functions in ParkingLot class
describe("Testing Functions in ParkingLot class", function () {
  it("Creating a Parking lot", function (done) {
    totalParkings = parkingLot.createNewParkingLot(commands[0]);
    assert.equal(totalParkings, 6);
    done();
  });

  it("Allocating Parking to User 1", function (done) {
    var response = parkingLot.parkCar(commands[1]);
    assert.equal(response, 1, "these numbers are equal");
    done();
  });

  it("Allocating Parking to User 2", function (done) {
    var response = parkingLot.parkCar(commands[2]);
    assert.equal(response, 2);
    done();
  });

  it("Allocating Parking to User 3", function (done) {
    var response = parkingLot.parkCar(commands[3]);
    assert.equal(response, 3);
    done();
  });

  it("Allocating Parking to User 4", function (done) {
    var response = parkingLot.parkCar(commands[4]);
    assert.equal(response, 4);
    done();
  });

  it("Allocating Parking to User 5", function (done) {
    var response = parkingLot.parkCar(commands[5]);
    assert.equal(response, 5);
    done();
  });

  it("Allocating Parking to User 6", function (done) {
    var response = parkingLot.parkCar(commands[6]);
    assert.equal(response, 6);
    done();
  });

  it("Leaving from slot 4", function (done) {
    var response = parkingLot.leaveCar(commands[7]);
    assert.equal(response, 4);
    done();
  });

  it("Checking status", function (done) {
    var response = parkingLot.getParkingStatus();
    assert.equal(response.length, 6);
    done();
  });

  it("Allocating Parking to User 7. Should Reallocate the nearest empty postion 4", function (done) {
    var response = parkingLot.parkCar(commands[9]);
    assert.equal(response, 4);
    assert.notEqual(response, 7);
    done();
  });

  it("Allocating Parking to User 8. Should indicate Parking is full.", function (done) {
    try {
      var response = parkingLot.parkCar(commands[10]);
    } catch (err) {
      assert.notEqual(response, 8);
    }
    done();
  });

  it("Registration no. for cars with white color", function (done) {
    var response = parkingLot.getCarsWithSameColor(commands[11]);
    response = response.split(", ");
    assert.equal(response[0], "KA-01-HH-1234");
    assert.equal(response[1], "KA-01-HH-9999");
    assert.equal(response[2], "KA-01-P-333");
    done();
  });

  it("Slot no. for registration no. KA-01-HH-3141", function (done) {
    var response = parkingLot.getSlotByCarNumber(commands[13]);
    assert.equal(response, 6);
    done();
  });

  it("Slot no. for registration no. MH-04-AY-1111", function (done) {
    var response = parkingLot.getSlotByCarNumber(commands[14]);
    assert.equal(response, "Not found");
    done();
  });
});
