// load + prepare
import loadLines from '../../LoadLines.js';
const lines = loadLines("input.txt")
const rules = lines.filter(l => l.includes("|")).map(l => l.split("|").map(Number));
const updates = lines.filter(l => l.includes(",")).map(l => l.split(",").map(Number));

console.log({
  part1: part1(),
  // part2: part2(),
})

function part1() {
  return updates.reduce((s, u) => isValidUpdate(u) ? s + u[Math.floor(u.length / 2)] : s, 0)
}

function part2(){
  const reorderedUpdates = updates.filter(u => !isValidUpdate(u)).map(reorderUpdate);
  return reorderedUpdates.reduce((s, u) => s + u[Math.floor(u.length / 2)], 0);
}

function isValidUpdate(update) {
  const pageIndex = new Map();
  update.forEach((page, index) => pageIndex.set(page, index));

  for (const [X, Y] of rules) {
      if (pageIndex.has(X) && pageIndex.has(Y) && pageIndex.get(X) > pageIndex.get(Y)) {
          return false;
      }
  }
  return true;
}

function reorderUpdate(update) {
  const graph = new Map();
  const inDegree = new Map();

  update.forEach(page => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });

  rules.forEach(([X, Y]) => {
      if (update.includes(X) && update.includes(Y)) {
          graph.get(X).push(Y);
          inDegree.set(Y, inDegree.get(Y) + 1);
      }
  });

  const queue = update.filter(page => inDegree.get(page) === 0);
  const sorted = [];

  while (queue.length) {
      const current = queue.shift();
      sorted.push(current);
      graph.get(current).forEach(neighbor => {
          if (inDegree.set(neighbor, inDegree.get(neighbor) - 1).get(neighbor) === 0) {
              queue.push(neighbor);
          }
      });
  }

  return sorted;
}