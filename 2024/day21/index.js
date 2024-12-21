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
let cache; // Cache to store previously computed results for memoization.

console.log({
    part1: solve(2),  // 2 intermediate robots.
    part2: solve(25), // 25 intermediate robots.
});

function solve(intermediateRobots) {
    const steps = intermediateRobots + 1; // Total steps = robots + 1 for the main control.
    cache = Array.from({ length: steps }, () => ({})); // Initialize cache for all steps.

    return codes.reduce((total, code) => {
        const complexity = calcDistance(0, code, steps) * parseInt(code.slice(0, 3)); 
        return total + complexity;
    }, 0);
}

function calcDistance(step, seq, steps, start = 'A') {
    if (step === steps) return seq.length; // Base case: return length if at the final robot.
    if (cache[step][seq]) return cache[step][seq]; // Check cache for precomputed result.

    let totalDistance = 0; // Initialize total distance.

    // Process each character in the code sequence.
    for (let i = 0; i < seq.length; i++) {
        const keyPad = keyPads[step > 0 ? 1 : 0]; // Select the correct keypad (0 = numkeypad).
        const [startX, startY] = keyPad[start]; // Get the current position on the keypad.
        const [endX, endY] = keyPad[seq[i]]; // Get the target position on the keypad.
        const [gapX, gapY] = keyPad['-']; // Get the position of the gap (invalid).
        
        // Calculate movement required to reach the target button.
        const moveVer = (startX > endX ? '^' : 'v').repeat(Math.abs(startX - endX));
        const moveHor = (startY > endY ? '<' : '>').repeat(Math.abs(startY - endY));

        let minDistance = Infinity; // Start with an infinite distance.
        // Try moving horizontally first, then vertically.
        if (startX !== gapX || endY !== gapY) minDistance = Math.min(minDistance, calcDistance(step + 1, moveHor + moveVer + 'A', steps));
        // Try moving vertically first, then horizontally.
        if (endX !== gapX || startY !== gapY) minDistance = Math.min(minDistance, calcDistance(step + 1, moveVer + moveHor + 'A', steps));

        totalDistance += minDistance;
        start = seq[i]; // Update the current position to the current button.
    }
    return cache[step][seq] = totalDistance; // Cache and return the computed distance.
}