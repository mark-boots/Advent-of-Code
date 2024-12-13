// load + prepare
import loadLines from '../../LoadLines.js';
const machines = loadLines("input.txt", false).split("\r\n\r\n")

console.log({ part1: solve(), part2: solve(1e13) })

function solve(adjust = 0) {
  return machines.reduce((tokens, machine) => {
    let [ax, ay, bx, by, tx, ty] = machine.match(/\d+/g);
    [tx, ty] = [tx, ty].map(v => +v + adjust);
    const d = ax * by - ay * bx;
    const a = (by * tx - bx * ty) / d;
    const b = (ax * ty - ay * tx) / d;
    return tokens + ((a%1 == 0 && b%1 == 0) ? a*3 + b : 0);
  }, 0)
}