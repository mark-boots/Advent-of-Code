import loadLines from '../../LoadLines.js'

const list = loadLines('input.txt').map(l => l.split(" ").map((v, i) => [v, v.split(",").map(Number)][i]))
const cache = new Map();
const sum = (a, b) => a + b;
const unfold = ([c, s]) => [Array(5).fill(c).join("?"), Array(5).fill(s).flat()];

console.log({
    part1: list.map(arrangements).reduce(sum),              //8419
    part2: list.map(unfold).map(arrangements).reduce(sum)   //160500973317706
})

function arrangements ([conditions, sizes]){
    if (conditions === '') return sizes.length ? 0 : 1;
    if (sizes.length === 0) return conditions.includes('#') ? 0 : 1;
    
    const key = `${conditions}-${sizes}`;
    if (cache.has(key)) return cache.get(key);

    let result = 0;
    const condition = conditions[0];
    if(".?".indexOf(condition) !== -1) result += arrangements([conditions.slice(1), sizes]);

    const [first, ...rest] = sizes;
    if("#?".indexOf(condition) !== -1 && first <= conditions.length 
        && !conditions.slice(0, first).includes('.') 
        && (first === conditions.length || conditions[first] !== '#')
    ) result += arrangements([conditions.slice(first + 1), rest]);

    cache.set(key, result);
    return result;
};