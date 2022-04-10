var Car = require("./car.js");

/**
 * @description a base class for Parking lot
 * @author Aadhar Chandiwala <chandiwalaaadhar@gmail.cmom>
 */

class ParkingLot {
  constructor() {
    this.MAX_PARKING_SLOTS = 0; // maximum parking slots allowed
    this.parkingSlots = new Array(); // array for parking slots
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description creates a parking lot with given maximum slot numbers.
   * It throws an error if zero or negative input is provided
   */
  createNewParkingLot(input) {
    this.MAX_PARKING_SLOTS = parseInt(input.split(" ")[1]);
    if (this.MAX_PARKING_SLOTS <= 0) {
      // minimum: 1 slot
      throw new Error("Minimum one slot is required to create parking slot");
    }
    for (var i = 0; i < this.MAX_PARKING_SLOTS; i++) {
      this.parkingSlots.push(null);
    }
    return this.MAX_PARKING_SLOTS;
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description allocates nearest slot number to incoming cars.
   * It throws an error if parking lot is empty or full.
   * It also throws an error if only one field (either registration number or color) is provided.
   */
  parkCar(input) {
    if (this.MAX_PARKING_SLOTS > 0) {
      var car, carNumber, carColor;
      carNumber = input.split(" ")[1];
      carColor = input.split(" ")[2];
      if (carNumber && carColor) {
        car = new Car(carNumber, carColor);
        var slot = this.findNearestAvailableSlot();
        if (slot === -1) {
          throw new Error("Sorry, parking lot is full");
        }
        this.parkingSlots[slot - 1] = car;
        return slot;
      } else {
        throw new Error("Please provide registration number and color both");
      }
    } else {
      throw new Error("Minimum one slot is required to create parking slot");
    }
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description makes slot free for given slot number.
   * It throws an error if parking lot is empty or
   * slot number is not found
   */
  leaveCar(input) {
    if (this.MAX_PARKING_SLOTS > 0) {
      var index = parseInt(input.split(" ")[1] - 1);
      if (index >= this.MAX_PARKING_SLOTS) {
        throw new Error(`Slot number ${index + 1} is not found`);
      } else if (this.parkingSlots[index] === null) {
        throw new Error(`Slot number ${index + 1} is already free`);
      } else if (index > -1 && index <= this.parkingSlots.length) {
        this.parkingSlots[index] = null;
        index = index + 1;
        return index;
      }
    } else {
      throw new Error("Sorry, parking lot is empty");
    }
  }

  /**
   * @description Returns an array containing parking details i.e. slot no, registration number and color
   */
  getParkingStatus() {
    var arr = new Array();
    if (this.MAX_PARKING_SLOTS > 0) {
      arr.push("Slot No. Registration No. Color ");

      // use binary search here
      for (var i = 0; i < this.parkingSlots.length; i++) {
        if (this.parkingSlots[i] != null) {
          var e = i + 1;
          arr.push(
            e +
              ".  " +
              this.parkingSlots[i].number +
              "  " +
              this.parkingSlots[i].color
          );
        }
      }
      return arr;
    } else {
      throw new Error("Sorry, parking lot is empty");
    }
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description returns a comma separated string of registration numbers of car having same color.
   * It returns null if car is not found
   */
  getCarsWithSameColor(input) {
    if (this.MAX_PARKING_SLOTS > 0) {
      var sameColoredCarsArray = new Array();
      for (var i = 0; i < this.parkingSlots.length; i++) {
        if (
          this.parkingSlots[i] &&
          this.parkingSlots[i].color.toLowerCase() ==
            input.split(" ")[1].toLowerCase()
        ) {
          sameColoredCarsArray.push(this.parkingSlots[i].number);
        }
      }
      return sameColoredCarsArray.join(", ");
    } else {
      return null;
    }
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description returns a comma separated string of slot numbers for cars of given color.
   * It returns null if cars of given color is not found.
   */
  getSlotsWithSameColorCar(input) {
    if (this.MAX_PARKING_SLOTS > 0) {
      var slotsWithSameColorCarArray = new Array();
      for (var i = 0; i < this.parkingSlots.length; i++) {
        if (
          this.parkingSlots[i] &&
          this.parkingSlots[i].color.toLowerCase() ==
            input.split(" ")[1].toLowerCase()
        ) {
          slotsWithSameColorCarArray.push(i + 1);
        }
      }
      return slotsWithSameColorCarArray.join(", ");
    } else {
      return null;
    }
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description returns slot number for given car number.
   * It returns null if car is not found.
   */
  getSlotByCarNumber(input) {
    if (this.MAX_PARKING_SLOTS > 0) {
      var ele = "Not found";
      for (var i = 0; i < this.parkingSlots.length; i++) {
        if (
          this.parkingSlots[i] &&
          this.parkingSlots[i].number == input.split(" ")[1]
        ) {
          ele = i + 1;
        }
      }
      return ele;
    } else {
      return null;
    }
  }

  /**
   * @description returns the nearest available slot
   * used by parkCar() method to find nearest slot
   */
  findNearestAvailableSlot() {
    for (var i = 0; i < this.parkingSlots.length; i++) {
      if (this.parkingSlots[i] == null) {
        return i + 1;
      }
    }
    return -1;
  }
}

module.exports = ParkingLot;
