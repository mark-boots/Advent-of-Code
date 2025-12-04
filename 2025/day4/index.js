import loadLines from '../../LoadLines.js';

const grid = loadLines("input.txt").map(line => line.split(''));

console.log({
    part1: solve(grid, 1),
    part2: solve(grid, 2)
});

function solve(grid, part, removed = 0) {
    let toRemove = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (check(row, col, grid,)) toRemove.push([row, col]);
        }
    }

    //part 1: count how many removed (no recursion)
    if (part === 1) return toRemove.length 

    //part 2: remove and recurse
    if (toRemove.length === 0) return removed;
    for (const [r, c] of toRemove) grid[r][c] = '.';
    return solve(grid, part, removed + toRemove.length);
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