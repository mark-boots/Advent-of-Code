import loadLines from '../../LoadLines.js';

const grid = loadLines("input.txt").map(line => line.split(''));

console.log({
    part1: solve(grid, false),
    part2: solve(grid, true)
});

function solve(grid, part2=false, removed = 0) {
    let remove = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (check(row, col, grid,)) remove.push([row, col]);
        }
    }
    
    //part 1: no recursion
    if (!part2) return remove.length

    //part 2: remove and recurse
    for (const [r, c] of remove) { grid[r][c] = '.'; removed++ }
    return remove.length === 0 ? removed : solve(grid, part2, removed   );
}

function check(r, c, g) {
    if (g[r][c] !== '@') return false;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let n = 0;
    for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < g.length && nc >= 0 && nc < g[nr].length && g[nr][nc] === '@') {
            if (++n >= 4) return false;
        }
    }
    return true;
}