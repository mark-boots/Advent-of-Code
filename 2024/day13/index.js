// load + prepare
import loadLines from '../../LoadLines.js';
const machines = loadLines("input.txt", false).split("\r\n\r\n")

console.log({
  part1: solve(machines),
  part2: solve(machines, 1e13)
})

function solve(machines, adjust = 0) {
  return machines.reduce((tokens, machine) => {
    let [ax, ay, bx, by, px, py] = machine.match(/\d+/g).map(Number);
    return tokens + minimumTokens(ax, ay, bx, by, px + adjust, py + adjust);
  }, 0)
}

// linear Diophantine equations using Cramer's rule to solve
function minimumTokens(ax, ay, bx, by, px, py) { 

  const det = ax * by - ay * bx;
  if (det === 0) return 0;

  const nA = (by * px - bx * py) / det;
  const nB = (ax * py - ay * px) / det;

  return (Number.isInteger(nA) && Number.isInteger(nB))
    ? nA * 3 + nB * 1
    : 0;
}