import loadLines from '../../LoadLines.js'

const GRID = loadLines('input.txt').map(v=>v.split(""));
const GRID_H = GRID.length;
const GRID_W = GRID[0].length;
const withinGrid = (y, x) => y >= 0 && y < GRID_H && x >= 0 && x < GRID_W;

const beams = [];
for(let y = 0; y < GRID_H; y++){
    beams.push([ [y, -1, 1] ]);
    beams.push([ [y, GRID_W, 3] ]);
}
for(let x = 0; x < GRID_W; x++){
    beams.push([ [-1, x, 2] ]);
    beams.push([ [GRID_H, x, 0] ]);
}
const beamResults = beams.map(getEnergizedTiles);

console.log({ 
    part1: beamResults[0],          // 6921
    part2: Math.max(...beamResults) // 7594
});

function getEnergizedTiles(beam) {
    const seen = new Set();
    const energized = new Set();
    while(beam.length > 0){
        let [y, x, d] = beam.shift();
        const key = [y,x,d].join(",");
        const [yy, xx] = [[y-1, x], [y, x+1], [y+1, x], [y, x-1]][d];
        
        if (seen.has(key) || !withinGrid(yy, xx)) continue;
        seen.add(key);
        energized.add(`${yy},${xx}`);
        let pos = GRID[yy][xx];
        if(pos == '/') beam.push([yy, xx, (5-d)%4]);
        else if(pos == '\\') beam.push([yy, xx, 3-d]);
        else if(pos == '|' && [1, 3].includes(d)) beam.push([yy, xx, 0], [yy, xx, 2]);
        else if(pos == '-' && [0, 2].includes(d)) beam.push([yy, xx, 1], [yy, xx, 3]);
        else beam.push([yy, xx, d]);
    }
    return energized.size;
}