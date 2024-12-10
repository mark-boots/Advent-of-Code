// load + prepare
import loadLines from '../../LoadLines.js';
const grid = loadLines("input.txt").map(l => l.split(""));
const antennas = antennasMap();

console.log({
    part1: findUniqueAntinodes(false),  // 409
    part2: findUniqueAntinodes(true),   // 1308
})

function findUniqueAntinodes(extended) {
    const uniqueAntinodes = new Set();
    for (const [frequency, locations] of antennas) {
        const antinodes = calculateAntinodes(locations, extended);
        for (const antinode of antinodes) uniqueAntinodes.add(antinode);
    }
    return uniqueAntinodes.size;
}

function calculateAntinodes(locations, extended) {
    const antinodes = new Set();

    for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            const [x1, y1] = locations[i];
            const [x2, y2] = locations[j];
            const dx = x2 - x1;
            const dy = y2 - y1;

            let k = extended ? 0 : 1;
            while (true) {
                const ax1 = x1 - k * dx;
                const ay1 = y1 - k * dy;
                const ax2 = x2 + k * dx;
                const ay2 = y2 + k * dy;

                if (isInBounds(ax1, ay1)) antinodes.add(key(ax1, ay1));
                if (isInBounds(ax2, ay2)) antinodes.add(key(ax2, ay2));
                if (!isInBounds(ax1, ay1) && !isInBounds(ax2, ay2)) break;

                if(!extended) break;
                k++;
            }     
        }
    }
    return antinodes;
}

function antennasMap() {
    const antennas = new Map();
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const cell = grid[y][x];
            if (cell!=='.') {
                if (!antennas.has(cell)) antennas.set(cell, []);
                antennas.get(cell).push([x, y]);
            }
        }
    }
    return antennas;
}

function key(...args) {
    return args.join(',');
}

function isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}