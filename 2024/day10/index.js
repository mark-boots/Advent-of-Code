// load + prepare
import loadLines from '../../LoadLines.js';
const map = loadLines("input.txt").map(l => l.split("").map(Number));
const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

console.log({ 
  part1: solve(map, part1), // 644
  part2: solve(map, part2)  // 1366
});

function solve(map, part) {
  return trailHeads(map).reduce((sum, pos) => sum + part(map, pos), 0);
}

function part1(map, [x, y]) {
  const queue = [[x, y, 0]];
  const visited = new Set();
  const nines = new Set();

  while (queue.length > 0) {
    const [x, y, height] = queue.shift();
    const key = `${x},${y}`;

    if (visited.has(key)) continue;

    visited.add(key);

    if (map[x][y] === 9) {
      nines.add(key);
      continue;
    }

    directions.forEach(([dx, dy]) => {
      const [nx, ny] = [x + dx, y + dy];
      if (validMove(map, nx, ny, height)) queue.push([nx, ny, map[nx][ny]]);
    });
  }

  return nines.size;
}

function part2(map, [x, y]) {
  const dfs = (x, y, height) =>{
    if (map[x][y] === 9) return 1;
    let trailCount = 0;

    directions.forEach(([dx, dy]) => {
      const [nx, ny] = [x + dx, y + dy];
      if (validMove(map, nx, ny, height)) trailCount += dfs(nx, ny, height + 1);
    })

    return trailCount;
  }
  return dfs(x, y, 0);
}

function trailHeads(map) {
  const trailheads = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 0) trailheads.push([i, j]);
    }
  }
  return trailheads;
}

function validMove(map, x, y, height) {
  return  x >= 0 &&
          x < map.length &&
          y >= 0 &&
          y < map[0].length &&
          map[x][y] === height + 1
}