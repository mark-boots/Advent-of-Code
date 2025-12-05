import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt", false).split('');
const dirs = { '^': [0, -1], 'v': [0, 1], '<': [-1, 0], '>': [1, 0] }

console.log({
    part1: delivery(),
    part2: delivery(2),
})
function delivery(santaCount = 1){
    const visited = new Set();
    const positions = Array(santaCount).fill([0, 0]);
    
    for(let i = 0; i < input.length; i++){
        const si = i % santaCount;
        const [x, y] = positions[si]
        const [dx, dy] = dirs[input[i]];
        const [nx, ny] =  [x + dx, y + dy];
        positions[si] = [nx, ny];
        visited.add(`${nx},${ny}`);
    }
    
    return visited.size;
}