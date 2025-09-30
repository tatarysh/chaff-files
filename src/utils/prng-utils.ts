// Simple hash function (djb2)
export const simpleHash = (str: string): number => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Ensure positive integer
};

// Simple Pseudo-Random Number Generator (LCG)
export class PRNG {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  // Returns a random number between 0 and 1
  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 2 ** 32;
    return this.seed / 2 ** 32;
  }
  // Returns a random integer between min and max (inclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  // Returns a random string of a given length
  nextString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(this.nextInt(0, chars.length - 1));
    }
    return result;
  }
  // Returns a random element from an array
  nextChoice<T>(choices: T[]): T {
    return choices[this.nextInt(0, choices.length - 1)];
  }
}
