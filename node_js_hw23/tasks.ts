// Task 1
const asyncTask1 = (): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 completed"), 1000));

const asyncTask2 = (): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve("Task 2 completed"), 2000));

const asyncTask3 = (): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3 completed"), 1500));

const executeSequentially = async (): Promise<void> => {
  try {
    const result1 = await asyncTask1();
    console.log(result1);

    const result2 = await asyncTask2();
    console.log(result2);

    const result3 = await asyncTask3();
    console.log(result3);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

executeSequentially();

// Task 2
const processString = async (str: string): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve(str.toUpperCase()), 1000));

const processStringsInParallel = async (strings: string[]): Promise<void> => {
  try {
    const results = await Promise.all(strings.map(processString));
    console.log("Processed strings:", results);
  } catch (error) {
    console.error("Error during processing:", error);
  }
};

processStringsInParallel(["hello", "world", "typescript"]);

// Task 3
const task1 = (): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 completed"), 1000));

const task2 = (): Promise<string> =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Task 2 failed")), 2000)
  );

const task3 = (): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3 completed"), 1500));

const handleParallelTasks = async (): Promise<void> => {
  try {
    const results = await Promise.all([task1(), task2(), task3()]);
    console.log("Results:", results);
  } catch (error) {
    console.error("Error occurred:", (error as Error).message);
  }
};

handleParallelTasks();

// Task 4
const createTimedPromise = (time: number): Promise<number> =>
  new Promise((resolve) => setTimeout(() => resolve(time), time));

const processDynamicDelays = async (times: number[]): Promise<void> => {
  try {
    const results = await Promise.all(times.map(createTimedPromise));
    console.log("Results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

processDynamicDelays([500, 1000, 1500, 2000]);
