import loadLines from '../../LoadLines.js';

// Disjoint Set Union (Union-Find)
class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
    this.components = n;
  }
  find(a) {
    return this.parent[a] === a ? a : (this.parent[a] = this.find(this.parent[a]));
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    this.components--;
    return true;
  }
  componentSizes() {
    const seen = new Set();
    const sizes = [];
    for (let i = 0; i < this.parent.length; i++) {
      const r = this.find(i);
      if (!seen.has(r)) {
        seen.add(r);
        sizes.push(this.size[r]);
      }
    }
    return sizes;
  }
}


const points = loadLines('input.txt').map(l => {
  const [x, y, z] = l.split(',').map(Number);
  return { x, y, z };
});
const edges = points.flatMap((pi, i) =>
  points.slice(i + 1).map((pj, j) => {
    const dx = pi.x - pj.x;
    const dy = pi.y - pj.y;
    const dz = pi.z - pj.z;
    return { i, j: j + i + 1, d2: dx * dx + dy * dy + dz * dz };
  })
).sort((a, b) => a.d2 - b.d2);
const N = points.length;
const dsu = new DSU(N);

// Part 1
const attempts = Math.min(N, edges.length);
for (let k = 0; k < attempts; k++) {
  dsu.union(edges[k].i, edges[k].j);
}
const sizes1 = dsu.componentSizes().sort((a, b) => b - a);
console.log("Part 1:", sizes1[0] * sizes1[1] * sizes1[2]);

// Part 2: continue from same DSU
let lastEdge = null;
for (let idx = attempts; idx < edges.length; idx++) {
  const e = edges[idx];
  if (dsu.union(e.i, e.j) && dsu.components === 1) {
    lastEdge = e;
    break;
  }
}
if (lastEdge) {
  const a = points[lastEdge.i];
  const b = points[lastEdge.j];
  console.log("Part 2:", a.x * b.x);
}