import loadLines from '../../LoadLines.js';

// format grid, get start pos
const [grid, start] = loadLines("example.txt").reduce(([g, s], l, i) => {
    l.split("").forEach((v, j) => (v=="S") ? s = {r: i, c: j} : "");
    g.push(l.replace("S",".").split(""));
    return [g, s];
}, [[],{}]);
const size = grid.length;
const N = 26501365;
const n = N & size;

const sm = [
    [size - 1, size - 1, n],
    [size - 1, 0, n],
    [0, size - 1, n],
    [0, 0, n],
].reduce((sum, [r, c, n]) => sum + fill(grid, r, c, n), 0);

const lg = [
    [size - 1, size - 1, n + size],
    [size - 1, 0, n + size],
    [0, size - 1, n + size],
    [0, 0, n + size],
].reduce((sum, [r, c, n]) => sum + fill(grid, r, c, n), 0);

const pt = [
    [0, start.col, size],
    [size - 1, start.col, size],
    [start.row, 0, size],
    [start.row, size - 1, size],
].reduce((sum, [r, c, n]) => sum + fill(grid, r, c, n), 0);

const f = [
    fill(grid, start.row, start.col, size - 1),
    fill(grid, start.row, start.col, size),
];

const m = (N - n) / size;

let part1 = fill(grid, start.row, start.col);
let part2 = 0;
part2 += sm * m;
part2 += lg * (m - 1);
part2 += pt;
part2 += f[0] * (m - 1) ** 2;
part2 += f[1] * m ** 2;

console.log({ part1, part2 })

function validNeighbors(grid, row, col){
    return [
        [row-1, col], 
        [row + 1, col], 
        [row, col - 1], 
        [row, col + 1],
    ].filter(([r, c]) => {
        return r >= 0 && r < size && c >= 0 && c < size && grid[r][c] == ".";
    });
}
function fill(grid, start_r, start_c, n){
    let set = new Set();
    set.add(start_r + ',' + start_c);
    for(let i = 0; i < n - 1; i++){
        const nSet = new Set();
        for(const p of set.values()){
            validNeighbors(grid, p.split(",")).forEach(([r,c]) => nSet.add(r + ',' + c));   
        }
        set = nSet;
    }
    return set.size;
}