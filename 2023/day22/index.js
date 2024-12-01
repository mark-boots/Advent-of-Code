import loadLines from '../../LoadLines.js';
const n2l = (n,l="")=>n<=0?l:n2l(Math.floor(--n/26),String.fromCharCode(65+(n%26))+l);

// parse
const bricks = loadLines("example.txt").map(l=> l.split("~").map(v=>v.split(",").map(Number)))

const width  = Math.max(...bricks.map(v=> Math.max(v[0][0], v[1][0]))) + 1;
const depth  = Math.max(...bricks.map(v=> Math.max(v[0][1], v[1][1]))) + 1;
const height = Math.max(...bricks.map(v=> Math.max(v[0][2], v[1][2]))) + 1;

const front = Array.from({length: height}, (_)=> Array(width).fill("."));
const side =  Array.from({length: height}, (_) => Array(depth).fill("."));

for(let i = 0; i < bricks.length; i++){
    for(let x = bricks[i][0][0]; x <= bricks[i][1][0]; x++){
        for(let z = bricks[i][0][2]; z <= bricks[i][1][2]; z++){
            front[z][x] = n2l(i+1);
        }
    }
    for(let y = bricks[i][0][1]; y < bricks[i][1][1]; y++){
        for(let z = bricks[i][0][2]; z <= bricks[i][1][2]; z++){
            side[z][y] = n2l(i+1);
        }
    }
}

console.log({width,depth,height});
console.log(bricks)
console.table(front.reverse());
console.table(side.reverse());

console.log(n2l(1))



