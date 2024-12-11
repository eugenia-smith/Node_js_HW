// task 1
const sumEvenNumbers = (arr: number[]): number => {
  return arr.reduce((acc, elem, ind, arr) => {
    if (elem % 2 === 0) {
      return acc + elem;
    }
    return acc;
  }, 0);
};

// task 2
interface StringToBooleanFunction {
  (str: string): boolean;
}

const checkString: StringToBooleanFunction = (str) => {
  if (str.length > 0) {
    return true;
  }
  return false;
};

console.log(checkString(""));

// task 3
function compareStrings(str1: string, str2: string): boolean {
  if (str1.length === str2.length) {
    return true;
  }
  return false;
}

// task 4
function getLastElement<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

// task 5
function makeTriple<T>(a: T, b: T, c: T): T[] {
  return [a, b, c];
}
