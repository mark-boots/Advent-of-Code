import loadLines from '../../LoadLines.js'

// const lines = loadLines('example.txt');
const lines = loadLines('input.txt');

// part 1
const part1 = lines.reduce((sum, line) => {
    for(let i = 0; i < line.length / 2; i++){
        if(line.substring(line.length/2).indexOf(line[i]) !==-1) return sum += getPriority(line[i]);
    }
},0)

console.log(part1)

// part 2
const commons = []
for(let i = 0; i < lines.length - 2; i+=3){
    for(let j = 0; j < lines[i].length; j++){
        if(lines[i+1].indexOf(lines[i][j]) !== -1  && lines[i+2].indexOf(lines[i][j]) !== -1 ){
            commons.push(getPriority(lines[i][j]))
            break;
        }
    }
}
const part2 = commons.reduce((sum, value)=> sum += value, 0)
console.log(part2);

// helpers
function getPriority(letter){
    return letter.charCodeAt() - (letter.toUpperCase() == letter ? 38 : 96)
}