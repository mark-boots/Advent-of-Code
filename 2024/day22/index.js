import loadLines from '../../LoadLines.js';
const secretNumbers = loadLines("input.txt").map(Number);
const steps = 2000;

console.log({
  part1: part1(),
  part2: part2()
});

function nextSecret(secret) {
    const mp = (s, m = 16777216) => ((s ^ secret) % m + m) % m;
    secret = mp(secret << 6);
    secret = mp(secret >> 5);
    secret = mp(secret << 11);
    return secret;
}

function part1() {
    return secretNumbers.reduce((sum, number) => {
        for (let i = 0; i < steps; i++) number = nextSecret(number);
        return sum + number;
    }, 0);
}

function part2() {
    const ranges = {};
    secretNumbers.forEach(number => {
        const visited = new Set();
        const changes = [];

        for (let i = 0; i < steps; i++) {
            const next = nextSecret(number);
            const change = next % 10 - number % 10
            changes.push(change);
            
            if (changes.length === 4) {
                const key = changes.join('');
                if (!visited.has(key)) {
                    if (!ranges[key]) ranges[key] = [];
                    ranges[key].push(next % 10);
                    visited.add(key);
                }
                changes.shift();
            }
            number = next;
        }

    });
    const rangesSums = Object.values(ranges).map(range => range.reduce((sum, num) => sum + num, 0));
    return Math.max(...rangesSums);
}