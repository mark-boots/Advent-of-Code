import loadLines from '../../LoadLines.js'

// const lines = loadLines('example.txt');
const lines = loadLines('input.txt');
const stackLines = lines.splice(0, lines.findIndex(line => line == "") - 1);
const instructionLines = lines.splice(2);

// prepare stacks array
const stacksCount = Math.ceil(stackLines[1].length / 4);
const stacks = []
for(let i = 0; i < stacksCount; i++){ stacks.push([])};
for(let row = stackLines.length - 1; row >= 0; row--){
    for(let column = 0; column < stacksCount; column++){
        const value = stackLines[row][column * 4 + 1];
        if(value !==" ") stacks[column].push(value)
    }
}

// prepare instructions array
const instructions = instructionLines.reduce((instructions, line)=>{
    const [move, from, to] = line.match(/\d+/g).map(Number);
    const instruction = {move, from: from-1, to: to-1};
    instructions.push(instruction);
    return instructions;
},[])

// execute instructions
function executeInstructionsPart1(stacks){
    instructions.forEach(instruction => {
        for(let i = 0; i < instruction.move; i++){
            stacks[instruction.to].push(stacks[instruction.from].pop());
        }
    })
    return stacks;
}
function executeInstructionsPart2(stacks){
    instructions.forEach(instruction => {
        const {move, from, to} = instruction;
        stacks[to].push(...stacks[from].splice(stacks[from].length - move));
    })
    return stacks;
}

// solutions
const solution = executeInstructionsPart2(stacks).reduce((str, stack) => str += stack.at(-1),"")
console.log(solution)