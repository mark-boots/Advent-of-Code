import loadLines from '../../LoadLines.js';

const grid = loadLines("input.txt").map(line => line.split(''));

console.log({
    part1: part1(cloneGrid(grid)),
    part2: part2(cloneGrid(grid))
})

function part1(grid) {
    let count = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (isRollAndNeighborsLessThan4(r, c, grid)) count++
        }
    }
    return count;
}

function part2(grid) {
    let removed = 0;
    while (true) {
        let toRemove = [];
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                if (isRollAndNeighborsLessThan4(r, c, grid)) {
                    toRemove.push([r, c]);
                    
                }
            }
        }
        if (toRemove.length === 0) break;
        for (const [r, c] of toRemove) grid[r][c] = '.';
        removed += toRemove.length;
    }
    return removed;
}


function isRollAndNeighborsLessThan4(r, c, g) {
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    if(g[r][c] !== '@') return false;
    let n = 0;
    for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < g.length && nc >= 0 && nc < g[nr].length) {
            if (g[nr][nc] === '@') n++;
        }
    }
    return n < 4;
}

function cloneGrid(g) {
    return g.map(row => row.slice());
}