// Task 1
abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return "Bark";
  }
}

class Cat extends Animal {
  makeSound(): string {
    return "Meow";
  }
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach((animal) => console.log(animal.makeSound()));

// Task 2
abstract class Shape {
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  abstract color: string;
}

class ColoredCircle extends ColoredShape {
  constructor(public radius: number, public color: string) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class ColoredRectangle extends ColoredShape {
  constructor(
    public width: number,
    public height: number,
    public color: string
  ) {
    super();
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

const shapes: ColoredShape[] = [
  new ColoredCircle(5, "red"),
  new ColoredRectangle(4, 6, "blue"),
];

shapes.forEach((shape) => {
  console.log(`Area: ${shape.calculateArea()}, Color: ${shape.color}`);
});

// Задание 3: Абстрактный класс Appliance
abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log("Washing Machine is now ON");
  }

  turnOff(): void {
    console.log("Washing Machine is now OFF");
  }
}

class Refrigerator extends Appliance {
  turnOn(): void {
    console.log("Refrigerator is now ON");
  }

  turnOff(): void {
    console.log("Refrigerator is now OFF");
  }
}

const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];
appliances.forEach((appliance) => {
  appliance.turnOn();
  appliance.turnOff();
});

// Task 4
abstract class Account {
  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
}

class SavingsAccount extends Account {
  private balance: number = 0;
  private interestRate: number = 0.05;

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited ${amount}, Balance: ${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log("Insufficient funds");
    } else {
      this.balance -= amount;
      console.log(`Withdrew ${amount}, Balance: ${this.balance}`);
    }
  }

  addInterest(): void {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    console.log(`Interest added: ${interest}, Balance: ${this.balance}`);
  }
}

class CheckingAccount extends Account {
  private balance: number = 0;
  private fee: number = 1.5;

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited ${amount}, Balance: ${this.balance}`);
  }

  withdraw(amount: number): void {
    const totalAmount = amount + this.fee;
    if (totalAmount > this.balance) {
      console.log("Insufficient funds");
    } else {
      this.balance -= totalAmount;
      console.log(
        `Withdrew ${amount} (Fee: ${this.fee}), Balance: ${this.balance}`
      );
    }
  }
}

const savings = new SavingsAccount();
savings.deposit(100);
savings.addInterest();
savings.withdraw(50);

const checking = new CheckingAccount();
checking.deposit(100);
checking.withdraw(50);

// Задание 5: Абстрактный класс Media
abstract class Media {
  abstract play(): void;
}

class Sound extends Media {
  play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play(): void {
    console.log("Playing video");
  }
}

const mediaItems: Media[] = [new Sound(), new Video()];
mediaItems.forEach((media) => media.play());
