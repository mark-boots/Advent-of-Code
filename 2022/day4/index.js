import loadLines from '../../LoadLines.js'

// const lines = loadLines('example.txt');
const lines = loadLines('input.txt');

let result1 =  0;
lines.forEach(line=>{
    const [one, two] = line.split(",").map(v=>v.split("-").map(Number)).sort((a,b)=>a[0]-b[0] || b[1] - a[1])
    if(one[1] >= two[1]) result1 +=1;
})
console.log(result1);

// part 2
let result2 =  0;
lines.forEach(line=>{
    const [one, two] = line.split(",").map(v=>v.split("-").map(Number)).sort((a,b)=>a[0]-b[0] || b[1] - a[1])
    if(one[1] >= two[0]) result2 +=1;
})
console.log(result2);