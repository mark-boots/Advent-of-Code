import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt").map(l => l.split('').map(Number));


function countVisible(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visible = Array.from({ length: rows }, () => Array(cols).fill(false));

  // We'll sweep row by row and column by column in one combined loop
  for (let r = 0; r < rows; r++) {
    let maxLeft = -1;
    let maxRight = -1;
    for (let c = 0; c < cols; c++) {
      // left→right
      if (grid[r][c] > maxLeft) {
        visible[r][c] = true;
        maxLeft = grid[r][c];
      }
      // right→left
      const rc = cols - 1 - c;
      if (grid[r][rc] > maxRight) {
        visible[r][rc] = true;
        maxRight = grid[r][rc];
      }
    }
  }

  for (let c = 0; c < cols; c++) {
    let maxTop = -1;
    let maxBottom = -1;
    for (let r = 0; r < rows; r++) {
      // top→bottom
      if (grid[r][c] > maxTop) {
        visible[r][c] = true;
        maxTop = grid[r][c];
      }
      // bottom→top
      const rr = rows - 1 - r;
      if (grid[rr][c] > maxBottom) {
        visible[rr][c] = true;
        maxBottom = grid[rr][c];
      }
    }
  }

  return visible.flat().filter(Boolean).length;
}



console.log(countVisible(input));
