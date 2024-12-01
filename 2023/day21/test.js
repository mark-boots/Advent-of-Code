import loadLines from '../../LoadLines.js';
Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

console.log(solve('input.txt')); //[ 3758, 621494544278648 ]
function solve(input) {
  return process(...parse(input));
}

function parse(input) {
  const grid = loadLines(input).map((l) => l.split(""));
  const rs = grid.findIndex((l) => l.includes("S"));
  const cs = grid[rs].findIndex((c) => c === "S");
  grid[rs][cs] = ".";
  return [grid, rs, cs];
}

function process(grid, rs, cs) {
  const size = grid.length;
  const neighbors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  function fill(grid, rs, cs, n) {
    let set = new Set();
    set.add(encode(rs, cs));
    for (let i = 0; i < n - 1; i++) {
      const nSet = new Set();
      for (const p of set.values()) {
        const [r, c] = decode(p);
        for (const [dr, dc] of neighbors) {
          const rr = r + dr;
          const cc = c + dc;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          if (grid[rr][cc] === ".") nSet.add(encode(rr, cc));
        }
      }
      set = nSet;
    }
    return set.size;
  }

  const N = 26501365;
  const n = N % size;

  const sm = [
    [size - 1, size - 1, n],
    [size - 1, 0, n],
    [0, size - 1, n],
    [0, 0, n],
  ].map(([r, c, n]) => fill(grid, r, c, n));

  const lg = [
    [size - 1, size - 1, n + size],
    [size - 1, 0, n + size],
    [0, size - 1, n + size],
    [0, 0, n + size],
  ].map(([r, c, n]) => fill(grid, r, c, n));

  const pt = [
    [0, cs, size],
    [size - 1, cs, size],
    [rs, 0, size],
    [rs, size - 1, size],
  ].map(([r, c, n]) => fill(grid, r, c, n));

  const f = [fill(grid, rs, cs, size - 1), fill(grid, rs, cs, size)];

  const m = (N - n) / size;
  let res = 0;
  res += sm.sum() * m;
  res += lg.sum() * (m - 1);
  res += pt.sum();
  res += f[0] * (m - 1) ** 2;
  res += f[1] * m ** 2;

  return [fill(grid, rs, cs, 65), res];
}

function encode(r, c) {
  return r + "," + c;
}

function decode(hash) {
  return hash.split(",").map(Number);
}