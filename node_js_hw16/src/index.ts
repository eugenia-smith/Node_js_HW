// task 1

function greetUser(name: string): void {
  console.log(`Hi, ${name}!`);
}

greetUser("Mary");

//task 2

interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(`Name: ${person.name}\nAge: ${person.age}\nCity: ${person.city}`);
}

const p1: Person = {
  name: "Ann",
  age: 61,
  city: "Washington, DC",
};

printPersonInfo(p1);

// task 3

function squareNumber(a: number): number {
  return Math.pow(a, 2);
}

console.log(squareNumber(15));

// task 4

function isEven(a: number): boolean {
  if (a % 2 === 0) {
    return true;
  }
  return false;
}

console.log(isEven(12));
console.log(isEven(15));

// task 5

interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Student: ${student.name}\nGrade: ${student.grade}`);
}

const st1: Student = {
  name: "Ann Marsh",
  grade: 3,
};

printStudentInfo(st1);

// task 6

function logMessage(text: string): void {
  console.log(text);
}

logMessage("Very important info to log");
