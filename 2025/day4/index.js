import loadLines from '../../LoadLines.js';

const grid = loadLines("input.txt").map(line => line.split(''));

console.log({
    part1: part1(cloneGrid(grid)),
    part2: part2(cloneGrid(grid))
})

function part1(grid) {
    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (check(row, col, grid)) count++
        }
    }
    return count;
}

function part2(grid) {
    let removed = 0;
    while (true) {
        let toRemove = [];
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (check(row, col, grid)) toRemove.push([row, col]);
            }
        }
        if (toRemove.length === 0) break;
        for (const [r, c] of toRemove) grid[r][c] = '.';
        removed += toRemove.length;
    }
    return removed;
}


function check(r, c, g) {
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    if(g[r][c] !== '@') return false;
    let n = 0;
    for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < g.length && nc >= 0 && nc < g[nr].length) {
            if (g[nr][nc] === '@') {
                n++;
                if (n >= 4) return false;
            }
        }
    }
    return true;
}

function cloneGrid(g) {
    return g.map(row => row.slice());
}