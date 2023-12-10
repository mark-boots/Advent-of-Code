import loadLines from '../../LoadLines.js'

const lines = loadLines('input.txt');
const map = lines.map(line => line.split(""));

const directions = {
    up:    { "F": "right", "|": "up",    "7": "left"  },
    right: { "J": "up",    "-": "right", "7": "down"  },
    down:  { "J": "left",  "|": "down",  "L": "right" },
    left:  { "L": "up",    "-": "left",  "F": "down"  },
};

let part1 = 0;
let [pos1, pos2] = getStartPositions();
while(true){
    pos1 = walk(pos1);
    pos2 = walk(pos2);
    part1++;
    if(pos1.y == pos2.y && pos1.x == pos2.x) break;
}
console.log(part1)

// helpers
function getStartPositions(){
    const startIdx = lines.join("").indexOf("S");
    const pos = { y: Math.floor(startIdx / lines[0].length), x: startIdx % lines[0].length };
    const [dir1, dir2] = [
        ['up', map[pos.y-1][pos.x]],
        ['right', map[pos.y][pos.x+1]],
        ['down', map[pos.y+1][pos.x]],
        ['left',map[pos.y][pos.x-1]],
    ].filter((dir,i) => Object.values(directions)[i][dir[1]])
    .map(v=>v[0]);
    let pos1 = {y: pos.y, x: pos.x, dir: dir1};
    let pos2 = {y: pos.y, x: pos.x, dir: dir2};
    return [pos1, pos2];
}

function walk({y,x,dir}){
    let newY = y, newX = x;
    if(dir == 'up') { newY = y - 1 };
    if(dir == 'right') { newX = x + 1 };
    if(dir == 'down') { newY = y + 1 };
    if(dir == 'left') { newX = x - 1 }
    
    let newDir = directions[dir][map[newY][newX]]
    let newPos = {y:newY, x:newX, dir:newDir};
    return newPos;
}