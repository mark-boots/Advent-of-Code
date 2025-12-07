import loadLines from '../../LoadLines.js';

    const grid = loadLines("input.txt").map(l => [...l]);
    const H = grid.length, W = grid[0].length;
    const startCol = grid[0].indexOf("S");

    console.log({ part1: splits(), part2: beams() });

    function splits(r = 0, c = startCol, seen = new Set()) {
      if (c < 0 || c > W - 1) return 0;
      while (r < H) {
        const key = r * W + c;
        if (seen.has(key)) return 0;
        seen.add(key);
        if (grid[r][c] === "^" ) return 1 + splits(r+1, c-1, seen) + splits(r+1, c+1, seen);
        r++
      }
      return 0;
    }

    function beams(r = 0, c = startCol, memo = new Map()) {
      if (c < 0 || c > W - 1) return 0;
      if (r >= H) return 1;
      const key = r * W + c;
      if (memo.has(key)) return memo.get(key);
      let result = grid[r][c] === "^" ? beams(r+1, c-1, memo) + beams(r+1, c+1, memo): beams(r+1, c, memo)
      memo.set(key, result);
      return result;
    }
