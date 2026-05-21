/**
 * Prime number calculation service.
 *
 * Provides methods for calculating prime numbers and their sums
 * within a fixed range of 0-10.
 */

/**
 * Check if a number is prime
 * @param {number} num - The number to check
 * @returns {boolean} - True if the number is prime, false otherwise
 */
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Get all prime numbers between 0 and 10
 * @returns {number[]} - Array of prime numbers
 */
function getPrimesUpToTen() {
  const primes = [];
  for (let i = 0; i <= 10; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

/**
 * Calculate the sum of prime numbers between 0 and 10
 * @returns {object} - Object containing sum and array of primes
 */
function calculateSum() {
  const primes = getPrimesUpToTen();
  const sum = primes.reduce((acc, prime) => acc + prime, 0);
  
  return {
    sum,
    primes
  };
}

module.exports = {
  calculateSum,
  getPrimesUpToTen,
  isPrime
};