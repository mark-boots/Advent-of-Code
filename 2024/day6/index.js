/* lot of uptomization needed */

// load + prepare
import loadLines from '../../LoadLines.js';

const map = loadLines("input.txt").map(line => line.split(""));
const directions = ['^', '>', 'v', '<']; 
const dirOffsets = { 
    '^': [-1,  0],
    '>': [ 0,  1], 
    'v': [ 1,  0], 
    '<': [ 0, -1],
};


const guard = {};
for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
        if (directions.includes(map[row][col])) {
            guard.y = row;
            guard.x = col;
            guard.dir = map[row][col];
            break;
        }
    }
}

console.log({
//   part1: part1(),
  part2: part2(),
});

function part1() {
    const visited = new Set();
    visited.add(`${guard.y},${guard.x}`);

    while (true) {
        const nextY = guard.y + dirOffsets[guard.dir][0];
        const nextX = guard.x + dirOffsets[guard.dir][1];

        if (!isWithinGridBounds(nextY, nextX, map)) break;

        if (map[nextY][nextX] === '#') {
            turnGuardRight();
        } else {
            guard.y = nextY;
            guard.x = nextX;
            visited.add(`${guard.y},${guard.x}`);
        }
    } 
    return visited.size;
}

function part2() {
    let obstructionCount = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '.' && !(y === guard.y && x === guard.x)) {
                map[y][x] = '#';
                if (causesLoop()) obstructionCount++;
                map[y][x] = '.';
            }
        }
    }
    return obstructionCount;
}

function causesLoop() {
    const stateSet = new Set(); 
    const testGuard = { y: guard.y, x: guard.x, dir: guard.dir }; 

    while (true) {
        const state = `${testGuard.y},${testGuard.x},${testGuard.dir}`;
        if (stateSet.has(state)) return true; 
        stateSet.add(state);

        const nextY = testGuard.y + dirOffsets[testGuard.dir][0];
        const nextX = testGuard.x + dirOffsets[testGuard.dir][1];

        if (!isWithinGridBounds(nextY, nextX, map)) break;

        if (map[nextY][nextX] === '#') {
            const currentDirIndex = directions.indexOf(testGuard.dir);
            testGuard.dir = directions[(currentDirIndex + 1) % 4];
        } else {
            testGuard.y = nextY;
            testGuard.x = nextX;
        }
    }

    return false; 
}

function isWithinGridBounds(row, col, grid) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

function turnGuardRight(guard) {
    const currentDirIndex = directions.indexOf(guard.dir);
    guard.dir = directions[(currentDirIndex + 1) % 4];
}
