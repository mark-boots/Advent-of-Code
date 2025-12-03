import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt");

let part1 = 0, part2 = 0;
for(const bank of input){
    part1 += maxJoltage(bank, 2);
    part2 += maxJoltage(bank, 12);
}
console.log({ part1, part2 });

function maxJoltage(bank, count) {
    let stack = [], remove = bank.length - count;
    for (const d of bank) {
        while (remove && stack.at(-1) < d) { stack.pop(); remove--; }
        stack.push(d);
    }
    return +stack.slice(0, count).join('');
}