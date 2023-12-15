import loadLines from '../../LoadLines.js'

const hash = str => str.split("").reduce((val, char) => ((val + char.charCodeAt()) * 17) % 256, 0);
const sequence = loadLines('input.txt')[0].split(",");
const boxes = Array.from({length: 256}, _ => _ = []);
for(let i = 0; i < sequence.length; i++){
    const [lens, label, operator] = sequence[i].match(/(\w+)([=-])(\d)?/);
    const bi = hash(label);
    const si = boxes[bi].findIndex(lens => lens.startsWith(label));
    if(operator == "=") si > -1 ? boxes[bi][si] = lens : boxes[bi].push(lens)
    else if(operator == "-" && si > -1) boxes[bi].splice(si, 1);
}
    
const part1 = sequence.reduce((sum, str) => sum += hash(str), 0);
const part2 = boxes.reduce((sum, box, bi) => ( box.forEach((slot, si) => sum += (bi + 1) * (si + 1) * slot.split("=")[1]), sum ), 0)

console.log({ part1, part2 }) // { part1: 509152, part2: 244403 }