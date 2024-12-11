// load + prepare
import loadLines from '../../LoadLines.js';
const stones = loadLines("input.txt", false).split(/\s/g).map(Number);

console.log(
  stonesAfterBlinks(stones, { part1: 25, part2: 75 })
); // { part1: 183484, part2: 218817038947400 }

function stonesAfterBlinks(stones, blinkStages) {
  let stoneCounts = new Map();

  for (const stone of stones) {
      stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
  }

  const results = {};
  const maxStage = Math.max(...Object.values(blinkStages));

  for (let i = 0; i < maxStage; i++) {
      let newStoneCounts = new Map();

      for (const [stone, count] of stoneCounts) {
          if (stone === 0) {
              newStoneCounts.set(1, (newStoneCounts.get(1) || 0) + count);
          } else if (Math.floor(Math.log10(stone) + 1) % 2 === 0) {
              const [left, right] = splitNumber(stone);
              newStoneCounts.set(left, (newStoneCounts.get(left) || 0) + count);
              newStoneCounts.set(right, (newStoneCounts.get(right) || 0) + count);
          } else {
              const newStone = stone * 2024;
              newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count);
          }
      }
      stoneCounts = newStoneCounts;

      for (const [key, stage] of Object.entries(blinkStages)) {
          if (i + 1 === stage) {
              let totalStones = 0;
              for (const count of stoneCounts.values()) {
                  totalStones += count;
              }
              results[key] = totalStones;
          }
      }
  }

  return results;
}

function splitNumber(num) {
  const digits = Math.floor(Math.log10(num)) + 1; // Calculate the number of digits
  const divisor = Math.pow(10, Math.floor(digits / 2)); // Calculate the splitting point
  return [Math.floor(num / divisor), num % divisor];
}
