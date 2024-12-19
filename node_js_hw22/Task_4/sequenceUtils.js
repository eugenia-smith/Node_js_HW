"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFibonacci = generateFibonacci;
exports.generatePrimeNumbers = generatePrimeNumbers;
function generateFibonacci(limit) {
    var sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <=
        limit) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}
function generatePrimeNumbers(limit) {
    var primes = [];
    var _loop_1 = function (num) {
        if (primes.every(function (prime) { return num % prime !== 0; })) {
            primes.push(num);
        }
    };
    for (var num = 2; num <= limit; num++) {
        _loop_1(num);
    }
    return primes;
}
