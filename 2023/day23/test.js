import loadLines from '../../LoadLines.js';

// const map = 

function pairs(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            callback(arr[i], arr[j]);
        }
    }
}

function loopDataGrid(grid, callback) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            callback(y, x, grid[y][x]);
        }
    }
}

function ints(coordString) {
    return coordString.split('_').map(Number);
}


const data = loadLines("input.txt").map(l => l.split(""));

const START = data[0].indexOf('.');
const END = data.at(-1).indexOf('.');
const VECTORS = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const serialize = ([y, x]) => `${y}_${x}`;

const getNeighbours = ([y, x], part2) => {
    let neighbours = [];
    for (let [vy, vx] of VECTORS) {
        let adjacent = data[y + vy]?.[x + vx];
        if (!adjacent || adjacent === '#') continue;
        if (
            part2 ||
            (vx === -1 && adjacent === '<') ||
            (vx === 1 && adjacent === '>') ||
            (vy === -1 && adjacent === '^') ||
            (vy === 1 && adjacent === 'v') ||
            adjacent === '.'
        ) {
            neighbours.push([y + vy, x + vx]);
        }
    }
    return neighbours;
};

const junctions = new Set([
    serialize([0, START]),
    serialize([data.length - 1, END])
]);

loopDataGrid(data, (y, x, point) => {
    if (point === '#') return;
    let neighbours = getNeighbours([y, x], true);
    if (neighbours.length > 2) {
        junctions.add(serialize([y, x]));
    }
});

function go(distance, visited, forbidden, current, target, getNeighbours, onEnd) {
    if (current[0] === target[0] && current[1] === target[1]) {
        onEnd(distance);
        return;
    }
    if (distance && forbidden.has(serialize(current))) {
        return;
    }

    for (let next of getNeighbours(current)) {
        let key = serialize(next);
        if (visited.has(key)) continue;
        visited.add(key);
        go(distance + (next[2] ?? 1), visited, forbidden, next, target, getNeighbours, onEnd);
        visited.delete(key);
    }
}

let graph = {};
pairs(Array.from(junctions), (a, b) => {
    go(0, new Set(), junctions, ints(a), ints(b), (current) => getNeighbours(current, true), (distance) => {
        graph[a] ??= new Set();
        graph[b] ??= new Set();
        graph[a].add([...ints(b), distance]);
        graph[b].add([...ints(a), distance]);
    });
});

let p1 = 0;
go(0, new Set(), new Set(), [0, START], [data.length - 1, END], getNeighbours, (distance) => {
    if (distance > p1) {
        p1 = distance;
    }
});

let p2 = 0;
go(0, new Set(), new Set(), [0, START], [data.length - 1, END], (current) => graph[serialize(current)], (distance) => {
    if (distance > p2) {
        p2 = distance;
    }
});

console.log('Part 1', p1);
console.log('Part 2', p2);