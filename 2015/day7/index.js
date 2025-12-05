import loadLines from '../../LoadLines.js';

const lines = loadLines("input.txt");

// Build instructions object in one pass
const instructions = lines.reduce((acc, line) => {
  const [expr, target] = line.split(" -> ");
  acc[target] = expr;
  return acc;
}, {});

const cache = {};

const ops = {
  SET: a => get(a),
  NOT: a => ~get(a) & 0xFFFF,
  AND: (a, b) => get(a) & get(b),
  OR:  (a, b) => get(a) | get(b),
  LSHIFT: (a, n) => (get(a) << n) & 0xFFFF,
  RSHIFT: (a, n) => get(a) >>> n,
};

// --- Part 1 ---
const signalA = get("a");
console.log("Part 1:", signalA);

// --- Part 2 ---
Object.keys(cache).forEach(k => delete cache[k]); 
instructions["b"] = String(signalA);              
const signalA2 = get("a");
console.log("Part 2:", signalA2);


function get(wire) {
  if (/^\d+$/.test(wire)) return Number(wire);
  if (cache[wire] !== undefined) return cache[wire];

  const expr = instructions[wire];
  if (!expr) throw new Error(`No instruction for wire ${wire}`);

  const parts = expr.split(" ");
  let a, op, b;

  if (parts.length === 1) [a] = parts, op = "SET";
  else if (parts.length === 2) [op, a] = parts;
  else [a, op, b] = parts;

  const value = ops[op](a, b);
  cache[wire] = value;
  return value;
}