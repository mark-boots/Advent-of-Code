// load + prepare
import loadLines from '../../LoadLines.js';

const example = false;
const file = example ? 'example.txt' : 'input.txt';
const bytes = loadLines(file).map(l => l.split(",").map(Number));
const bytesToSimulate = example ? 12 : 1024;
const gridSize = example ? 7 : 71;
const grid = Array.from({length: gridSize}, () => Array(gridSize).fill('.'));

console.log(solve())

function solve(){
  let part1 = null, part2 = null;
  for (let i = 0; i < bytes.length; i++) {
    const [y, x] = bytes[i];
    grid[x][y] = "#";
    const shortestPath = bfs(grid, [0, 0], [gridSize - 1, gridSize - 1]);
    if(i == bytesToSimulate) part1 = shortestPath;
    if (shortestPath === -1) part2 = `${y},${x}`;
    if(part1 && part2) return {part1, part2}
  }
}
function bfs(grid, start, end){
  const queue = [start];
  const visited = new Set();
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let steps = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift() || [];
      if (x === end[0] && y === end[1]) return steps;
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length || grid[nx][ny] === "#" || visited.has(`${nx},${ny}`)) {
          continue;
        }
        queue.push([nx, ny]);
        visited.add(`${nx},${ny}`);
      }
    }
    steps++;
  }
  return -1;
}