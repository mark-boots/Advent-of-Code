import loadLines from '../../LoadLines.js';
const input = loadLines('input.txt', false).trim().split('\r\n\r\n').map(lines => lines.split('\r\n').map(l => l.split(/:?\s/g)));
const wires = input[0].reduce((obj, [key, val]) => (obj[key] = parseInt(val), obj), {})
const instructions = input[1].map(([in1, op, in2, _, out]) => ({ in1, op, in2, out, executed: false }));
const operation = { 'AND': (a, b) => a & b, 'OR': (a, b) => a | b, 'XOR': (a, b) => a ^ b }

console.log({
    part1: part1(wires, instructions),
    part2: part2(instructions)
})

function part1(wires, instructions){
    while (instructions.some(({ executed }) => !executed)) {
        instructions.forEach(({in1, op, in2, out, executed}, i) => {
            if (!executed && wires[in1] !== undefined && wires[in2] !== undefined) {
                wires[out] = operation[op](wires[in1], wires[in2]);
                instructions[i].executed = true;
            }
        });
    }
    return parseInt(Object.keys(wires).filter(w => w[0] === 'z').sort().reverse().map(w => wires[w]).join(''), 2);
};

function part2(instructions) {
    const incorrect = [];
    const instr = (type, id) => {
        const m = instructions.find(({ in1, op, in2 }) => ((in1 === `x${id}` && in2 === `y${id}`) || (in1 === `y${id}` && in2 === `x${id}`)) && op === type);
        return m ? instructions.find(({ in1, in2 }) => [in1, in2].includes(m.out)) : null;
    };
    const instrZ = id => instructions.find(({ out }) => out === `z${id}`);
    const checkConn = (x, ops, first = false) => x && !ops.includes(x.op) && !first ? incorrect.push(x.out) : null;
    
    for (let i = 0; i < 45; i++) {
        const id = i.toString().padStart(2, '0');
        checkConn(instrZ(id), ['XOR']);
        checkConn(instr("AND", id), ['OR'], i > 0);
        checkConn(instr("XOR", id), ['XOR', 'AND']);
    }
    incorrect.push(...instructions.filter(({ in1, in2, out, op }) => !/[xy]/.test(in1[0]) && !/[xy]/.test(in2[0]) && !/[z]/.test(out[0]) && op === 'XOR').map(i => i.out));
    return incorrect.sort().join(',');
}