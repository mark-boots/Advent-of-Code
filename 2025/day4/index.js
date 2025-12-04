import loadLines from '../../LoadLines.js';
const lines = loadLines("input.txt")
const grid = lines.map(line => line.split(''));
const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

console.log({
    part1: solve(grid),
    part2: solve(grid, true)
});

function solve(grid, recursive = false, count = 0) {
    const remove = [];
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[r].length; c++)
            if (grid[r][c] == '@' && dirs.filter(([y, x]) => grid[r + y]?.[c + x] == '@').length < 4) remove.push([r, c]);

    if (!recursive) return remove.length;
    remove.forEach(([r, c]) => (grid[r][c] = '.', count++));
    return remove.length ? solve(grid, true, count) : count;
}