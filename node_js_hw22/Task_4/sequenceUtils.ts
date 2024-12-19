export function generateFibonacci(limit: number): number[] {
  const sequence = [0, 1];
  while (
    sequence[sequence.length - 1] + sequence[sequence.length - 2] <=
    limit
  ) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2]
    );
  }
  return sequence;
}

export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = [];
  for (let num = 2; num <= limit; num++) {
    if (primes.every((prime) => num % prime !== 0)) {
      primes.push(num);
    }
  }
  return primes;
}
