// load + prepare
import loadLines from "../../LoadLines.js";
const input = loadLines("example.txt").map(l => l.split(":"))

console.log({
  part1: part1(input),
});

// Utility: Parse input
function parseInput(input) {
  const registers = input.slice(0, 3).reduce((o,[k,v])=>{
    o[k.slice(-1)] = Number(v);
    return o;
  }, {});
  const program = input.at(-1)[1].split(",").map(Number);

  return { registers, program };
}

// 3-bit Computer Emulator
function runProgram({ A, B, C }, program) {
  
  let output = [];
  let ip = 0;

  const comboValue = (operand) => {
    if (operand <= 3) return operand;
    if (operand === 4) return A;
    if (operand === 5) return B;
    if (operand === 6) return C;
    return 0; // Operand 7 is invalid
  };

  while (ip < program.length) {
    const opcode = program[ip];
    const operand = program[ip + 1];
    if (opcode === undefined) break;

    switch (opcode) {
      case 0: // adv
        A = Math.floor(A / Math.pow(2, comboValue(operand)));
        break;

      case 1: // bxl
        B ^= operand;
        break;

      case 2: // bst
        B = comboValue(operand) % 8;
        break;

      case 3: // jnz
        if (A !== 0) {
          ip = operand;
          continue;
        }
        break;

      case 4: // bxc
        B ^= C; // Operand ignored
        break;

      case 5: // out
        output.push(comboValue(operand) % 8);
        break;

      case 6: // bdv
        B = Math.floor(A / Math.pow(2, comboValue(operand)));
        break;

      case 7: // cdv
        C = Math.floor(A / Math.pow(2, comboValue(operand)));
        break;

      default:
        throw new Error(`Unknown opcode ${opcode} at position ${ip}`);
    }

    ip += 2;
  }

  return output;
}

// Part 1
function part1(input) {
  const { registers, program } = parseInput(input);
  const output = runProgram(registers, program);
  return output.join(",");
}


