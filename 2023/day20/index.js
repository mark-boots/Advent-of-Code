import loadLines from '../../LoadLines.js';

const lines = loadLines("input.txt");
const config = lines.map((line) => {
  const [device, destination] = line.split("->");
  const dest = destination.split(",").map((d) => d.trim());
  if (device.trim() === "broadcaster") return ["broadcaster", "bc", dest];
  return [device.slice(1).trim(), device[0], dest];
});

const state = new Map();
config.forEach(([id, type, dest]) => {
  if (type === "%") state.set(id, { type, state: false, dest });
  if (type === "&") state.set(id, { type, state: {}, dest });
  if (type === "bc") state.set(id, { type, dest });
});

config.forEach(([id, type]) => {
  if (type !== "&") return;
  const inputs = config.filter((el) => el[2].includes(id)).map((el) => el[0]);
  const item = state.get(id);
  inputs.forEach((input) => (item.state[input] = false));
});

const heap = [];

const flipFlop = (id, input) => {
  if (input) return;
  const item = state.get(id);
  item.state = !item.state; 
  item.dest.forEach((d) => heap.push([d, item.state, id]));
};

const broadcaster = (id, input) => {
  if (input) return;
  const item = state.get(id);
  item.dest.forEach((d) => heap.push([d, input, id]));
};

const conjunction = (id, input, origin) => {
  const item = state.get(id);
  item.state[origin] = input;

  if (Object.values(item.state).every((value) => value === true))
    item.dest.forEach((d) => heap.push([d, false, id]));
  else item.dest.forEach((d) => heap.push([d, true, id]));
};

let hi = 0, lo = 0
let dx = 0, jh = 0, ck = 0, cs = 0;

let buttonPresses = 1;
while (dx * jh * ck * cs === 0) {
  heap.push(["broadcaster", false, "button"]);
  while (heap.length) {
    const operation = heap.shift();
    const [dest, pulse, origin] = operation;
    if (dest === "output") continue;

    if (buttonPresses < 1001) pulse ? hi++ : lo++; 
    const item = state.get(dest);
    if (!item) continue;

    const originMap = { mp: 'dx', ng: 'jh', qt: 'ck', qb: 'cs' };
    if (originMap[origin] && pulse) eval(`${originMap[origin]} = buttonPresses`);

    if (item.type === "bc") broadcaster(dest, pulse);
    if (item.type === "&") conjunction(dest, pulse, origin);
    if (item.type === "%") flipFlop(dest, pulse);
  }
  buttonPresses++;
}

console.log({ 
    part1: hi * lo,             // 919383692
    part2: dx * jh * ck * cs,   // 247702167614647
}) 