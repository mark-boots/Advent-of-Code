import loadLines from '../../LoadLines.js';
const input = loadLines('input.txt', false).trim().split('\r\n\r\n').map(lines => lines.split('\r\n'));
const wires = input[0].reduce((obj, wire) =>{
    const [key, val] = wire.split(': ');
    obj[key] = parseInt(val);
    return obj
},{})
const instructions = input[1].map(instruction => {
    const [in1, op, in2, _, out] = instruction.split(' ');
    return { in1, op, in2, out, executed: false }
})
const operation = {
    'AND': (a, b) => a & b,
    'OR': (a, b) => a | b,
    'XOR': (a, b) => a ^ b
}

console.log({
    part1: part1(wires, instructions),
    part2: part2(instructions)
})

function part1(wires, instructions){
    while (instructions.some(instruction => !instruction.executed)) {
        for (let i = 0; i < instructions.length; i++) {
            const {in1, op, in2, out, executed} = instructions[i];
            if (executed) continue;

            if (wires[in1] !== undefined && wires[in2] !== undefined) {
                wires[out] = operation[op](wires[in1], wires[in2]);
                instructions[i].executed = true;
            }
        }
    }
    const zWires = Object.keys(wires).filter(w => w[0] === 'z').sort().reverse().map(w => wires[w]).join('');
    return parseInt(zWires, 2);
};

/* needed help for this, credits to CodingAP (Github) */ 
function part2(instructions){

    const XA = (x, id) => instructions.find(({in1, op, in2}) => ((in1 === `x${id}` && in2 === `y${id}`) || (in1 === `y${id}` && in2 === `x${id}`)) && op === x);
    const Z = (id) => instructions.find(({out}) => out === `z${id}`);
    const OA = (x) => instructions.find(({in1, in2}) => [in1, in2].includes(x.out));

    const incorrect = [];
    for (let i = 0; i < 45; i++) {
        const id = i.toString().padStart(2, '0');
        const xor = XA("XOR", id);
        const and = XA("AND", id);
        const z = Z(id);
        
        if([xor, and, z].includes(undefined)) continue

        // each z must be connected to an XOR
        if (z.op !== 'XOR') incorrect.push(z.out);
        
        // each AND must go to an OR (besides the first case as it starts the carry flag)
        const or = OA(and);
        if (or && or.op !== 'OR' && i > 0) incorrect.push(and.out);

        // the first XOR must to go to XOR or AND
        const after = OA(xor);
        if (after && after.op === 'OR') incorrect.push(xor.out);
    }

    // each XOR must be connected to an x, y, or z
    incorrect.push(...instructions
        .filter(({in1, op, in2, out}) => {
            return  !/[xy]/.test(in1[0]) && 
                    !/[xy]/.test(in2[0]) && 
                    !/[z]/.test(out[0]) && 
                    op === 'XOR'
        })
        .map(instruction => instruction.out))

    return incorrect.sort().join(',');
};