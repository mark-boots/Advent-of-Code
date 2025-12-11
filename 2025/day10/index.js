import loadLines from '../../LoadLines.js';
import { init } from 'z3-solver';

const { Context } = await init();
const ctx = new Context();

const machines = loadLines('input.txt').map(line => {
  const [target, ...rest] = line.trim().split(/\s+/);
  const jolts = rest.pop().slice(1, -1).split(',').map(Number);
  const buttons = rest.map(b => b.slice(1, -1).split(',').map(Number));
  const targetMask = [...target.slice(1, -1)].reduce((m, ch, i) => m | (ch === '#' ? 1 << i : 0), 0);
  return { targetMask, toggleMasks: buttons.map(btn => btn.reduce((m, i) => m | (1 << i), 0)), buttons, jolts };
});

let part1 = 0, part2 = 0;
for (const machine of machines) {
  part1 += solvePart1(machine);
  part2 += await solvePart2(machine);
}
console.log({ part1, part2 });
process.exit(0);


//-----------------------

function solvePart1({ targetMask, toggleMasks }) {
  const states = new Map();
  const queue = [[0, 0]];
  let qHead = 0;
  states.set(0, 0);

  while (qHead < queue.length) {
    const [mask, presses] = queue[qHead++];
    if (mask === targetMask) return presses;

    toggleMasks.forEach((tm, i) => {
      const newMask = mask ^ tm;
      const newPresses = presses + 1;
      if (!states.has(newMask) || states.get(newMask) > newPresses) {
        states.set(newMask, newPresses);
        queue.push([newMask, newPresses]);
      }
    });
  }
  return -1;
}

//-----------------------

async function solvePart2({ buttons, jolts }) {
  const presses = Array(buttons.length).fill(0).map((_, i) => ctx.Int.const(`b${i}`));
  const opt = new ctx.Optimize();

  jolts.forEach((jolt, i) => {
    const relevant = presses.filter((_, j) => buttons[j].includes(i));
    if (!relevant.length && jolt) return -1;
    if (relevant.length) opt.add(ctx.Eq(relevant.length === 1 ? relevant[0] : ctx.Sum(...relevant), jolt));
  });

  presses.forEach(p => opt.add(ctx.GE(p, 0)));
  opt.minimize(ctx.Sum(...presses));

  const result = await opt.check();
  if (result.toString() !== 'sat') return -1;

  const model = await opt.model();
  return presses.reduce((sum, p) => sum + parseInt(model.eval(p).toString()), 0);
}