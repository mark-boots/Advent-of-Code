import loadLines from '../../LoadLines.js';
const connections = loadLines("input.txt").reduce((acc, l) => {
  const [a, b] = l.split("-");
  acc[a] = [...acc[a] || [], b];
  acc[b] = [...acc[b] || [], a];
  return acc;
}, {});

console.log({ part1: part1(), part2: part2() });

function part1() {
  const triplets = new Set();
  for (const [node, neighbors] of Object.entries(connections)) {
    for (let i = 0; i < neighbors.length; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        const n1 = neighbors[i];
        const n2 = neighbors[j];
        const triplet = [node, n1, n2];

        if (connections[n1].includes(n2) && triplet.some(n => n[0]=='t')) {
          triplets.add(triplet.sort().join(","));
        }
      }
    }
  }
  return triplets.size;
}

function part2() {
  let largestClique = [];

  const bronKerbosch = (currentClique, candidates, excluded) => {
    if (candidates.length === 0 && excluded.length === 0) {
      if (currentClique.length > largestClique.length) largestClique = currentClique;
      return;
    }

    while (candidates.length > 0) {
      const v = candidates.shift();
      const newClique = [...currentClique, v];
      const newCandidates = candidates.filter(n => connections[v].includes(n));
      const newExcluded = excluded.filter(n => connections[v].includes(n));
      bronKerbosch(newClique, newCandidates, newExcluded);
      excluded.push(v);
    }
  };

  bronKerbosch([], Object.keys(connections), []);
  return largestClique.sort().join(",");
}