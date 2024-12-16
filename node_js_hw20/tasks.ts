// Task 1
class Animal {
  name: string;
  species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  sound() {
    console.log("The animal makes sound");
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, species: string, breed: string) {
    super(name, species);
    this.breed = breed;
  }

  sound() {
    console.log("The Dog barks");
  }
}

// Task 2
class Library {
  static totalBooks = 0;

  addBook() {
    Library.totalBooks++;
  }

  static getTotalBooks(): number {
    return Library.totalBooks;
  }
}

//Task 3
class Vehicle {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

class Motorcycle extends Vehicle {
  type: string;

  constructor(make: string, model: string, type: string) {
    super(make, model);
    this.type = type;
  }
}
