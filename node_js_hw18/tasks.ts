// task 1
type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "Ann",
  permissions: ["copy", "read"],
  email: "ann@email.com",
};

console.log(adminUser);

//task 2
type Engine = {
  type: string;
  horsepower: number;
};

type Car = {
  make: string;
  model: string;
  engine: Engine;
  year?: number;
};

function displayCarInfo(car: Car): void {
  console.log(
    `This is a ${car.model} of ${car.make} made in ${car.year} having ${car.engine.type} engine of ${car.engine.horsepower} horses`
  );
}

// task 3
type Product = {
  name: string;
  price: number;
};

interface calculateDiscount {
  (product: Product, discount: number): number;
}

const getPrice: calculateDiscount = (product, discount) => {
  return product.price - product.price * discount * 0.01;
};

// task 4

interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: "Agnes Doyle", salary: 4562 },
  { name: "Jenny Garth", salary: 9875 },
  { name: "Alfred Pibody", salary: 6523 },
];

function printSalary(employees: Employee[]): number[] {
  return employees.map((elem) => elem.salary);
}

console.log(printSalary(employees));

// task 5

interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

function displayStudentInfo(student: Student): void {
  console.log(
    `Here is ${student.firstName} ${student.lastName} with his grade of ${student.grade}`
  );
}

// task 6

interface concatStrings {
  (str1: string, str2: string): string;
}

const getString: concatStrings = (str1, str2) => {
  return str1 + str2;
};

console.log(getString("dont put us together ", "bad idea"));
