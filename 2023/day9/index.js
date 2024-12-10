import loadLines from '../../LoadLines.js'
function result(part){
    return loadLines('input.txt').map(v=>v.split(" ").map(Number)).reduce((result, sequence) => {
        let val = (part == '2' ? sequence.reverse() : sequence).at(-1);
        while(sequence.some(v => v !== 0)) {
            sequence = sequence.slice(1).map((val, idx) => val - sequence[idx]);
            val += sequence.at(-1);
        }
        return result + val;
    }, 0);
}
console.log({ part1: result(1), part2: result(2) }) // { part1: 1868368343, part2: 1022 }