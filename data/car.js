class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'close';
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }
    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;
    
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk');
  }
  closeTrunk() {
    console.log('Race cars do not have a trunk');
  }

}

const toyota = new Car({brand: 'Toyota', model: 'Corolla'});
const tesla = new Car({brand: 'Tesla', model: 'Model 3'});
const raceCar = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20});

// console.log(toyota);
// console.log(tesla);
console.log(raceCar);

toyota.displayInfo();
for (let i = 0; i < 3; i++) {
  toyota.go();
}
toyota.brake();
toyota.displayInfo();

toyota.openTrunk(); // This should not work because the speed is not 0.
toyota.displayInfo();

tesla.displayInfo();
tesla.go();
tesla.brake();
tesla.brake();
tesla.displayInfo();

tesla.openTrunk();
tesla.go(); // The speed should not increase because trunk is open.
tesla.displayInfo();

for (let i = 0; i < 3; i++) {
  raceCar.go();
}
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();
