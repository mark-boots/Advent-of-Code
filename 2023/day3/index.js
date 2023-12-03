import loadLines from '../../LoadLines.js'
const lines = loadLines('input.txt');

const gears = {};

// part 1
const part1 = lines.reduce((sum, line, lineIndex) => {
    const numbers = getNumbersFromLine(line);
    numbers.forEach(number=>{
        const adjacents = getNumberAdjacents(lines,lineIndex,number);
        if(adjacents.some(a => /[^\d.]/.test(a))) sum += number.value; 
    })
    return sum;
}, 0)
console.log(part1);

// part 2 depends on running part 1 as well;
const part2 = Object.values(gears).reduce((sum, gear)=>{
    if(gear.length == 2) sum += gear[0] * gear[1];
    return sum;
}, 0)
console.log(gears);
console.log(part2);

function getNumbersFromLine(line){
    const re = /\d+/g;
    const numbers = [];
    let match;
    while((match = re.exec(line)) != null){
        numbers.push({ 
            value: Number(match[0]),
            index: match.index,
            length: match[0].length
        });
    }
    return numbers;
}

function getNumberAdjacents(lines, row, number){
    const adjacents = []
    for(let r = row - 1; r <= row + 1; r++){
        for(let c = number.index - 1; c <= number.index + number.length; c++){
            const val = lines[r]?.[c];
            if(val) adjacents.push(val)
            // for part 2 gears
            if(val == '*'){
                const key = r + '-' + c;
                gears[key] = [...gears[key]??[], number.value]
            }
        }
    }
    return adjacents;
}