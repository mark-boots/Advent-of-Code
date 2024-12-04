// load + prepare
import loadLines from '../../LoadLines.js';
const grid = loadLines("input.txt").map(l => l.split(""));

console.log({ 
  part1: part1(), 
  part2: part2(),
})

function part2(){
  let count = 0
  for(let row = 1; row < grid.length - 1; row++){
    for(let col = 1; col < grid[row].length - 1; col++){
        if(
          grid[row][col] == 'A' &&
          ['MS','SM'].includes(grid[row-1][col-1] + grid[row+1][col+1]) &&
          ['MS','SM'].includes(grid[row-1][col+1] + grid[row+1][col-1]) 
        ) count ++
    }
  }
  return count
}

function part1() {
  const word = 'XMAS';
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [rowDir, colDir] of directions) {
        if (isValid(row, col, rowDir, colDir)) count++;
        if (isValid(row, col, -rowDir, -colDir)) count++;
      }
    }
  }

  function isValid(row, col, rowDir, colDir) {
    return [...Array(word.length)].every((_, i) => {
      const r = row + i * rowDir;
      const c = col + i * colDir;
      return r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === word[i];
    });
  }

  return count
}
