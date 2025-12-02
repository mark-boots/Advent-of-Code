// load + prepare
import loadLines from "../../LoadLines.js";
const input = loadLines("example.txt").map(l => l.split(":"));

// Initialize registers
const registers = input.slice(0, 3).reduce((o,[k,v])=>{
  o[k.slice(-1)] = Number(v);
  return o;
}, {});

const program = input.at(-1)[1].split(",").map(Number);

// Function to execute the program and capture the output
function runProgram(registers, program) {
  let ip = 0; // Instruction pointer
  let output = [];

  // Helper to get the operand value (literal or register)
  function getOperandValue(operand) {
    if (operand <= 3) return operand; // literal operand
    switch (operand) {
      case 4: return registers.A;
      case 5: return registers.B;
      case 6: return registers.C;
      default: return 0; // operand 7 is reserved and should not appear
    }
  }

  while (ip < program.length) {
    const opcode = program[ip];
    const operand = program[ip + 1];
    
    switch (opcode) {
      case 0: // adv
        const divisor = Math.pow(2, getOperandValue(operand));
        registers.A = Math.floor(registers.A / divisor);
        ip += 2;
        break;

      case 1: // bxl
        registers.B ^= getOperandValue(operand);
        ip += 2;
        break;

      case 2: // bst
        registers.B = getOperandValue(operand) % 8;
        ip += 2;
        break;

      case 3: // jnz
        if (registers.A !== 0) {
          ip = getOperandValue(operand);
        } else {
          ip += 2;
        }
        break;

      case 4: // bxc
        registers.B ^= registers.C;
        ip += 2;
        break;

      case 5: // out
        output.push(getOperandValue(operand) % 8);
        ip += 2;
        break;

      case 6: // bdv
        const divisorB = Math.pow(2, getOperandValue(operand));
        registers.B = Math.floor(registers.A / divisorB);
        ip += 2;
        break;

      case 7: // cdv
        const divisorC = Math.pow(2, getOperandValue(operand));
        registers.C = Math.floor(registers.A / divisorC);
        ip += 2;
        break;
      
      default:
        // Unknown opcode, program should halt
        ip = program.length;
        break;
    }
  }

  return output.join(',');
}

// Function to find the smallest value of A that causes the program to output a copy of itself
function findSmallestA(program) {
  const expectedOutput = program.join(','); // The program output itself is the expected output

  let currentValueOfA = 1; // Start with the smallest positive value for A
  let stepSize = 1000; // Start with a large step size
  let lastSuccessfulOutput = "";

  // Continue until we find the match
  while (true) {
    const registersCopy = {...registers};
    registersCopy.A = currentValueOfA;

    const output = runProgram(registersCopy, program);

    // If the output matches the program, we've found the correct value of A
    if (output === expectedOutput) {
      return currentValueOfA;
    }

    // Check if output is similar to the last one, reduce the step size when we're closer
    if (output !== lastSuccessfulOutput) {
      lastSuccessfulOutput = output;
      currentValueOfA += stepSize; // Increase A by a larger step
    } else {
      // If the output is similar, we reduce the step size to check smaller ranges
      stepSize = Math.floor(stepSize / 2);
      currentValueOfA += stepSize; // Move by a smaller step
    }
  }
}

// Run both parts in a single execution

// Part 1: Execute the program and collect the output
function part1() {
  const registersCopy = {...registers};
  const output = runProgram(registersCopy, program);
  console.log("Part 1 Output: ", output);
}

// Part 2: Find the smallest value of A that causes the program to output a copy of itself
function part2() {
  const smallestA = findSmallestA(program);
  console.log("Part 2 Output: ", smallestA);
}

// Run both parts
part1(); // Part 1: Outputs the results of the program with the initial registers
part2(); // Part 2: Outputs the smallest value of A that causes the program to output itself
