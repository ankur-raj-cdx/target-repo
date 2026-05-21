const { calculateSum } = require("../services/primeService");

describe("primeService", () => {
  describe("calculateSum", () => {
    it("should return sum of primes between 0 and 10", () => {
      const result = calculateSum();
      
      expect(result).toEqual({
        sum: 17,
        primes: [2, 3, 5, 7]
      });
    });

    it("should return consistent results on multiple calls", () => {
      const result1 = calculateSum();
      const result2 = calculateSum();
      
      expect(result1).toEqual(result2);
    });

    it("should include all prime numbers between 0 and 10", () => {
      const result = calculateSum();
      
      expect(result.primes).toHaveLength(4);
      expect(result.primes).toContain(2);
      expect(result.primes).toContain(3);
      expect(result.primes).toContain(5);
      expect(result.primes).toContain(7);
    });

    it("should calculate correct sum", () => {
      const result = calculateSum();
      
      // 2 + 3 + 5 + 7 = 17
      expect(result.sum).toBe(17);
      
      // Verify sum matches actual addition of primes array
      const calculatedSum = result.primes.reduce((acc, prime) => acc + prime, 0);
      expect(result.sum).toBe(calculatedSum);
    });
  });
});