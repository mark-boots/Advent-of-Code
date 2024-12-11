// load + prepare
import loadLines from '../../LoadLines.js';
const stones = loadLines("input.txt", false).split(/\s/g).map(Number);

console.log( stonesAfterBlinks(stones, { part1: 25, part2: 75 }) ); 
// { part1: 183484, part2: 218817038947400 }

function stonesAfterBlinks(stones, blinkStages) {
  let stoneCounts = new Map(stones.map(stone => [stone, 1]))

  const results = {};

  for (let i = 0; i < Object.values(blinkStages).at(-1); i++) {
      let newStoneCounts = new Map();

      for (const [stone, count] of stoneCounts) {
          if (stone === 0) {
              newStoneCounts.set(1, (newStoneCounts.get(1) || 0) + count);
          } else if (Math.floor(Math.log10(stone) + 1) % 2 === 0) {
              const [l, r] = splitNumber(stone);
              newStoneCounts.set(l, (newStoneCounts.get(l) || 0) + count);
              newStoneCounts.set(r, (newStoneCounts.get(r) || 0) + count);
          } else {
              const newStone = stone * 2024;
              newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count);
          }
      }
      stoneCounts = newStoneCounts;

      // check if blink stage
      for (const [key, stage] of Object.entries(blinkStages)) {
          if (i + 1 === stage) results[key] = [...stoneCounts.values()].reduce((s,v) => s+v, 0)
      }
  }
  return results;
}

function splitNumber(num) {
  const digits = Math.floor(Math.log10(num)) + 1; // Calculate the number of digits
  const divisor = Math.pow(10, Math.floor(digits / 2)); // Calculate the splitting point
  return [Math.floor(num / divisor), num % divisor];
}
