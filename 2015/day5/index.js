import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt");

console.log(
    input.reduce(({part1, part2}, line) => {
        if (/^(?=(?:.*[aeiou]){3,})(?=.*([a-z])\1)(?!.*(ab|cd|pq|xy)).*$/.test(line)) part1++;
        if (/([a-z]{2}).*\1/.test(line) && /([a-z]).\1/.test(line)) part2++;
        return { part1, part2 };
    }, { part1: 0, part2: 0 })
)