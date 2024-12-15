
import loadLines from '../../LoadLines.js';
import fs from 'fs';
const robots = loadLines('input.txt').map(line => line.match(/-?\d+/g).map(Number));

const { part1, part2 } = solve(robots, 101, 103);
console.log({ part1, part2 });

function solve(robots, w, h) {
  let part1 = null, part2 = null, seconds = 0;

  while (part1 === null || part2 === null) {
    const grid = Array.from({ length: h }, () => Array(w).fill(0));
    for (const [px, py, vx, vy] of robots) {
      let nx = (px + vx * seconds) % w;
      let ny = (py + vy * seconds) % h;
      if (nx < 0) nx += w;
      if (ny < 0) ny += h;
      grid[ny][nx]++;
    }
    if (seconds === 100 && part1 === null) part1 = calcSafetyFactor(grid);
    if (part2 === null && hasCristmasTree(grid)) part2 = seconds;
    seconds++;
  }
  return { part1, part2 };
}

function calcSafetyFactor(grid) {
  const midX = Math.floor(grid[0].length / 2);
  const midY = Math.floor(grid.length / 2);
  const quadrants = [0, 0, 0, 0];

  for (const [y, row] of grid.entries()) {
    for (const [x, cell] of row.entries()) {
      if (x === midX || y === midY) continue;
      const quadrant = (x < midX ? 0 : 1) + (y < midY ? 0 : 2);
      quadrants[quadrant] += cell;
    }
  }
  return quadrants.reduce((product, count) => product * count, 1);
}

function hasCristmasTree(grid) {
  // check if there is a row with a sequence of at least 10 robots?
  for (const row of grid) {
    let count = 0;
    for (const cell of row) {
      if(cell == 0) count = 0;
      else if(++count > 10) {
        writeGridToFile(grid); /* just to see what it looks like */
        return true;
      }
    }
  }
  return false;
}

function writeGridToFile(grid) {
  fs.writeFileSync('christmasTree.txt', 
    grid
      .map(row => row.map(cell => (cell > 0 ? '#' : '.')).join('')) 
      .join('\n')
  )
}
