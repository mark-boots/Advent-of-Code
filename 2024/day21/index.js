import loadLines from '../../LoadLines.js';
const codes = loadLines('input.txt');
const keyPads = [
    {
        '7': [0, 0], '8': [0, 1], '9': [0, 2],
        '4': [1, 0], '5': [1, 1], '6': [1, 2],
        '1': [2, 0], '2': [2, 1], '3': [2, 2],
        '-': [3, 0], '0': [3, 1], 'A': [3, 2]
    },
    {
        '-': [0, 0], '^': [0, 1], 'A': [0, 2],
        '<': [1, 0], 'v': [1, 1], '>': [1, 2]
    }
];
let cache; // store computed results for memoization.

console.log({
    part1: solve(2),  // 2 intermediate robots.
    part2: solve(25), // 25 intermediate robots.
});

function solve(intermediateRobots) {
    const steps = intermediateRobots + 1; // total steps = robots + 1 for main control.
    cache = Array.from({ length: steps }, () => ({})); // init cache for all steps.
    return codes.reduce((total, code) => total + calcDistance(0, code, steps) * parseInt(code.slice(0, 3)),0)
}

function calcDistance(step, seq, steps) {
    if (step === steps) return seq.length; // return length if final robot.
    if (cache[step][seq]) return cache[step][seq]; // check cache for precomputed result.
    let start = 'A', totalDist = 0;

    // each sequence char
    for (let i = 0; i < seq.length; i++) {
        const keyPad = keyPads[step > 0 ? 1 : 0]; // gelect correct keypad (0 = numkeypad).
        const [startY, startX] = keyPad[start]; // get current pos keypad.
        const [endY, endX] = keyPad[seq[i]]; // get target pos keypad.
        const [gapY, gapX] = keyPad['-']; // get pos gap (invalid).
        
        // calc move to target.
        const moveH = (startY > endY ? '^' : 'v').repeat(Math.abs(startY - endY));
        const moveV = (startX > endX ? '<' : '>').repeat(Math.abs(startX - endX));

        let minDist = Infinity;
        const md = (a,b) => Math.min(minDist, calcDistance(step + 1, a + b + 'A', steps));
        // move ver/hor then hor/ver
        if (startY !== gapY || endX !== gapX) minDist = md(moveV,moveH);
        if (endY !== gapY || startX !== gapX) minDist = md(moveH,moveV);

        totalDist += minDist;
        start = seq[i]; // pos = target
    }
    return cache[step][seq] = totalDist; // cache and return distance.
}