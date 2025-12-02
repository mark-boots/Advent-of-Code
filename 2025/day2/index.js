import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt", false);

let part1 = 0, part2 = 0;
for(const [start, end] of input.split(",").map(v=>v.split("-"))){
    for(let i = +start; i <= +end; i++){
        if(/^(.+)\1$/.test(i)) part1 += i;
        if(/^(.+)\1+$/.test(i)) part2 += i;
    }
}

console.log({ part1, part2 })