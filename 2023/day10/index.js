import loadLines from '../../LoadLines.js';

const lines = loadLines('input.txt');
const map = lines.map(line => line.split(""));
const directions = {
    up:    { "F": "right", "|": "up",    "7": "left"  },
    right: { "J": "up",    "-": "right", "7": "down"  },
    down:  { "J": "left",  "|": "down",  "L": "right" },
    left:  { "L": "up",    "-": "left",  "F": "down"  },
};
const seen = new Set();
let part1 = 0;
let part2 = 0;

let [pos1, pos2] = getStartPositions();
seen.add(posToString(pos1));
while(true){
    pos1 = walk(pos1);
    pos2 = walk(pos2);
    seen.add(posToString(pos1));
    seen.add(posToString(pos2));

    part1++;
    if(pos1.y == pos2.y && pos1.x == pos2.x) {
        seen.add(posToString(pos1));
        break;
    }
}

const lx = map[0].length / 4;
const ly = map.length / 4;
part2 = sumArray( 
    map
    .slice(ly, -ly)
    .map((line, y) => line
      .slice(lx, -lx)
      .filter((_, x) => !seen.has(`${y+ly},${x+lx}`))
      .length
    )
)

console.log({ part1, part2 });

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
    let pos1 = {y: pos.y, x: pos.x, dir: dir1, val: map[pos.y][pos.x]};
    let pos2 = {y: pos.y, x: pos.x, dir: dir2, val: map[pos.y][pos.x]};
    return [pos1, pos2];
}
function walk({y,x,dir}){
    let newY = y, newX = x;
    if(dir == 'up') { newY = y - 1 };
    if(dir == 'right') { newX = x + 1 };
    if(dir == 'down') { newY = y + 1 };
    if(dir == 'left') { newX = x - 1 }
    
    let newDir = directions[dir][map[newY][newX]];
    let newVal = map[newY][newX];
    let newPos = {y:newY, x:newX, dir:newDir, val: newVal};
    return newPos;
}
function posToString({y,x}){ return y+","+x };
function sumArray (arr){ return arr.reduce((a,v)=> a+v) };