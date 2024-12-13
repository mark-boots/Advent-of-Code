// load + prepare
import loadLines from '../../LoadLines.js';
const machines = loadLines("input.txt", false).split("\r\n\r\n")

console.log({ part1: solve(machines), part2: solve(machines, 1e13) })

function solve(machines, adjust = 0) {
  return machines.reduce((tokens, machine) => {
    let [ax, ay, bx, by, px, py] = machine.match(/\d+/g).map(Number);
    return tokens + minimumTokens(ax, ay, bx, by, px + adjust, py + adjust);
  }, 0)
}

function minimumTokens(ax, ay, bx, by, px, py) { 
  const det = ax * by - ay * bx;
  const nA = (by * px - bx * py) / det * 3;
  const nB = (ax * py - ay * px) / det;
  return (Number.isInteger(nA) && Number.isInteger(nB)) ? nA + nB : 0;
}