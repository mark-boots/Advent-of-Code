import loadLines from '../../LoadLines.js';
const machines = loadLines("input.txt", false).split("\r\n\r\n").map(m => m.match(/\d+/g))
const solve = (adjust = 0) => 
  machines.reduce((tokens, [ax, ay, bx, by, tx, ty]) => {
    [tx, ty] = [tx, ty].map(v => +v + adjust);
    const a = (by * tx - bx * ty) / (ax * by - ay * bx);
    const b = (ax * ty - ay * tx) / (ax * by - ay * bx);
    return tokens + ( !(a%1||b%1) ? a*3 + b : 0 );
  }, 0)
console.log({ part1: solve(), part2: solve(1e13) })