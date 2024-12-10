import loadLines from '../../LoadLines.js';
import { init } from 'z3-solver';

const area = { min: 200000000000000, max: 400000000000000 };
const hailstones = loadLines("input.txt").map(l => {
    const [ px, py, pz, vx, vy, vz ] = l.match(/-?\d+/g).map(Number);
    return { p: {x: px, y: py, z: pz}, v: {x: vx, y: vy, z: vz} };
})

let part1 = 0;
for (let i = 0; i < hailstones.length; i++) {
    const { p: p1, v: v1 } = hailstones[i];
    for (let j = i + 1; j < hailstones.length; j++) {
        const { p: p2, v: v2 } = hailstones[j];
        const a = v1.y / v1.x;
        const d = a * v2.x - v2.y;
        const t2 = (p2.y - p1.y + (a * p1.x) - (a * p2.x)) / d;
        const t1 = (p2.x + (v2.x * t2) - p1.x) / v1.x;
        const x = p1.x + (v1.x * t1);
        const y = p1.y + (v1.y * t1); 

        if (d !== 0 && t2 > 0 && t1 > 0 &&
            area.min <= x && x <= area.max &&
            area.min <= y && y <= area.max) part1 +=1;
    }
}
console.log({ part1 }) // { part1: 15558 }

async function part2() {
    const { Context } = await init();
    const { Solver, Int } = new Context('main');
    const solver = new Solver();
    const [ x, y, z, dx, dy, dz, t ] = [
        Int.const('x'), Int.const('y'), Int.const('z'),
        Int.const('dx'), Int.const('dy'), Int.const('dz'),
        hailstones.map((_, i) => Int.const(`t${i}`))
    ];
    for(let i = 0; i < 3; i++){
        const h = hailstones[i];
        solver.add(t[i].mul(h.v.x).add(h.p.x).sub(x).sub(t[i].mul(dx)).eq(0));
        solver.add(t[i].mul(h.v.y).add(h.p.y).sub(y).sub(t[i].mul(dy)).eq(0));
        solver.add(t[i].mul(h.v.z).add(h.p.z).sub(z).sub(t[i].mul(dz)).eq(0));
    }
    await solver.check();
    const n = Number(solver.model().eval(x.add(y).add(z)).value());
    console.log({ part2: n }); // { part2: 765636044333842 }
}
part2();