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
let cache;

console.log({
    part1: solve(2),
    part2: solve(25),
});

function solve(robotDirInputs) {
    const steps = robotDirInputs + 1;
    cache = Array.from({ length: steps }, () => ({}));

    return codes.reduce((total, code) => {
        const complexity = calcDistance(0, code, steps) * parseInt(code.slice(0, 3));
        return total + complexity;
    }, 0);
}

function calcDistance(step, seq, steps, start = 'A') {
    if (step === steps) return seq.length; // Base case: return length if at final robot
    if (cache[step][seq] !== undefined) return cache[step][seq]; // Check if cached result exists
    let totalDistance = 0;
    
    for (let i = 0; i < seq.length; i++) {
        const keyPad = keyPads[+(step > 0)]; // Get the current keypad
        const [startX, startY] = keyPad[start]; // Get start button coordinates
        const [endX, endY] = keyPad[seq[i]]; // Get target button coordinates
        const [gapX, gapY] = keyPad['-']; // Get gap position (invalid position)
        
        // Movement to the target button (up/down and left/right)
        const verticalMove = '^'.repeat(Math.max(startX - endX, 0)) + 'v'.repeat(Math.max(endX - startX, 0));
        const horizontalMove = '<'.repeat(Math.max(startY - endY, 0)) + '>'.repeat(Math.max(endY - startY, 0));
        
        let minDistance = Infinity;
        // Check if moving to the gap and calculate distance
        if (startX !== gapX || endY !== gapY) {
            minDistance = Math.min(minDistance, calcDistance(step + 1, horizontalMove + verticalMove + 'A', steps));
        }
        if (endX !== gapX || startY !== gapY) {
            minDistance = Math.min(minDistance, calcDistance(step + 1, verticalMove + horizontalMove + 'A', steps));
        }

        totalDistance += minDistance;
        start = seq[i]; // Update start position to current button
    }

    return cache[step][seq] = totalDistance;
}
