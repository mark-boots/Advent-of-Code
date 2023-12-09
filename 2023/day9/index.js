import loadLines from '../../LoadLines.js'

const [part1, part2] = loadLines('input.txt').reduce((results, history) => {
    let sequence = history.split(" ").map(Number);
    const vals = [sequence.at(-1), sequence[0]];
    let i = 0;
    while(sequence.some(v => v !== 0)) {
        sequence = sequence.slice(1).map((val, idx) => val - sequence[idx]);
        vals[0] += sequence.at(-1);
        vals[1] += sequence[0] * [1,-1][++i % 2];
    }
    return results.map((result, i) => result + vals[i]);
}, [0,0])

console.log({ part1, part2 }) // { part1: 1868368343, part2: 1022 }