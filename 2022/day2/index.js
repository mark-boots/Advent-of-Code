import loadLines from '../../LoadLines.js'

// const lines = loadLines('example.txt');
const lines = loadLines('input.txt');

// part 1
const game1 = {
    'X':['B','A','C'],
    'Y':['C','B','A'],
    'Z':['A','C','B'],
}

const result1 = lines.reduce((score, line) => {
    const [opp, me] = line.split(" ");
    const objScore = Object.keys(game1).indexOf(me) + 1;
    const winScore = game1[me].indexOf(opp) * 3;
    score += winScore + objScore;
    return score;
}, 0)
console.log(result1);

// part 2
const game2 = {
    'A': ['Y','Z','X'],
    'B': ['X','Y','Z'],
    'C': ['Z','X','Y']
}
const result2 = lines.reduce((score, line) => {
    const [opp, res] = line.split(" ")
    const objScore = game2[opp].indexOf(res) + 1;   
    const winScore = ['X','Y','Z'].indexOf(res) * 3;
    score += objScore + winScore
    return score;
},0)

console.log(result2);