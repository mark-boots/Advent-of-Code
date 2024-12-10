import loadLines from '../../LoadLines.js';

const map = loadLines("example.txt").map(l => l.split(""));
const start = {y: 0, x: map[0].indexOf("."), d: 2};
const dirs = [{y:-1, x:0}, {y: 0, x: 1}, {y:1, x:0}, {y:0, x:-1}];
const key = ({y, x, _}) => [y,x].join("");
const valid = (({y, x}) => {
    return y >= 0 && y < map.length && x >= 0 && x < map[0].length && map[y,x]!=="#";
})
const visited = new Map();
visited.add(key(start))

const neigbors = dirs.map(({y, x}) => {
    return {y: start.y + y, x: start.x + x}
}).filter(valid)

console.log()

function step({y,x,d}){
    return {y: y + dirs[d].y, x: x + dirs[d].x}
}


console.table(map);
console.log(start);
console.log(dirs);

