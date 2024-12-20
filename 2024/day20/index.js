import loadLines from '../../LoadLines.js';
const grid = loadLines('input.txt').map(l => l.split(""));
const [startPos, endPos] = [findPos(grid, 'S'), findPos(grid, 'E')];
const minSavedValue = 100;

console.log(solve([2, 20]));

function solve(cheatDurations) {
  const results = Object.fromEntries(cheatDurations.map(d => [d, 0]));
  const travelPath = [];  
  const visited = new Set(); 
  const queue = [{ ...startPos }]; 
  const timeSavedMap = {};  

  while (queue.length > 0) {
    const { y, x } = queue.shift();
    travelPath.push({ y, x });
    if (y === endPos.y && x === endPos.x) break;
    visited.add(positionKey(y, x));
    const [ny, nx] = 
      getNeighbors(grid, y, x)
      .filter(([ny, nx]) => grid[ny][nx] !== "#" && !visited.has(positionKey(ny, nx)))[0];
    queue.push({ y: ny, x: nx });
  }

  for (let startIdx = 0; startIdx < travelPath.length - 1; startIdx++) {
    for (let endIdx = startIdx + 1; endIdx < travelPath.length; endIdx++) {
      const timeSavedBySkipping = endIdx - startIdx;
      const yDiff = Math.abs(travelPath[startIdx].y - travelPath[endIdx].y);
      const xDiff = Math.abs(travelPath[startIdx].x - travelPath[endIdx].x);
      const distance = yDiff + xDiff;

      cheatDurations.forEach(cheatDuration => {
        if (distance <= cheatDuration) {
          const totalSaved = timeSavedBySkipping - distance; 
          if (totalSaved >= minSavedValue) {
            results[cheatDuration]++;
            timeSavedMap[totalSaved] = (timeSavedMap[totalSaved] ?? 0) + 1;
          }
        }
      });
    }
  }
  return results;
}

function findPos(grid, char) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === char) return { y, x };
    }
  }
  return null;
}

function getNeighbors(grid, y, x) {
  return [
    [y + 0, x - 1], [y + 0, x + 1], [y - 1, x + 0], [y + 1, x + 0],
    [y - 1, x - 1], [y + 1, x - 1], [y - 1, x + 1], [y + 1, x + 1],
  ].filter(([ny, nx]) =>
    ny >= 0 && nx >= 0 && ny < grid.length && nx < grid[0].length && grid[ny][nx]
  )
}
function positionKey(...arg) {
  return arg.join(",");
}