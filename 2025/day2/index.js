import loadLines from '../../LoadLines.js';
const ranges = loadLines("input.txt", false).split(",").map(v=>v.split("-"));

let part1 = 0, part2 = 0;
for(const [start, end] of ranges){
    for(let i = +start; i <= +end; i++){
        if(/^(.+)\1$/.test(i)) part1 += i;
        if(/^(.+)\1+$/.test(i)) part2 += i;
    }
}

console.log({ part1, part2 })