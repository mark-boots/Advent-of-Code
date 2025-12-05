import loadLines from '../../LoadLines.js';
const instructions = loadLines("input.txt").map(line => {
    const [from, to ] = line.match((/\d+,\d+/g)).map(c => c.split(',').map(Number));
    const command = line.includes('turn on') ? 'on' : line.includes('turn off') ? 'off' : 'toggle';
    return { command, from, to };
})


console.log({
    part1: part1(),
    part2: part2(),
})

function part1(){
    const grid = Array.from({ length: 1000 }, () => Array(1000).fill(0));
    for (const { command, from, to } of instructions) {
        for (let x = from[0]; x <= to[0]; x++) {
            for (let y = from[1]; y <= to[1]; y++) {
                grid[x][y] = command === 'on' ? true : command === 'off' ? false : !grid[x][y];
            }
        }
    }
    return grid.flat().filter(Boolean).length;
}


function part2(){    
    const grid = Array.from({ length: 1000 }, () => Array(1000).fill(0));
    for(const { command, from, to} of instructions){
        for(let x = from[0]; x <= to[0]; x++){
            for(let y = from[1]; y <= to[1]; y++){
                const br = grid[x][y];
                grid[x][y] = (Math.max(0, br + (command === 'on' ? 1 : command === 'off' ? -1 : 2)))                
            }
        }
    }
    return grid.flat().reduce((a,b)=>a+b, 0)
}