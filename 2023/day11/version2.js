import loadLines from '../../LoadLines.js';

const space = loadLines('input.txt').map(line => line.split(""));
const galaxies = [];
const pairs = [];
const emptyRows = [];
const emptyCols = [];

for(let y = 0, max = Math.max(space.length, space[0].length); y < max; y++){
    let emptyRow = true;
    let emptyCol = true;
    for(let x = 0; x < max; x++){
        //galaxies, pairs and empty rows;
        if (x < space[0].length && space[y][x] == '#'){
            emptyRow = false;
            galaxies.push({y,x});
            if(galaxies.length > 1) {     
                for(let i = 0; i < galaxies.length -1; i++){
                    pairs.push([galaxies.at(-1), galaxies[i]]);
                }
            }
        }
        //empty cols; (swap x y index)
        if(y < space.length && space[x][y] !=='.') emptyCol = false;
    }
    if(emptyCol) emptyCols.push(y);
    if(emptyRow) emptyRows.push(y);    
}

console.log({
    part1: cosmicExpansion(2),       //9693756
    part2: cosmicExpansion(1000000), //717878258016
})

function cosmicExpansion(expansion){
    return pairs.reduce((sum, pair) => sum + getDistance(pair, expansion), 0);
}
function getDistance([p1,p2], expansion){
    const [yMin, yMax] = [p1.y, p2.y].sort((a,b) => a - b)
    const [xMin, xMax] = [p1.x, p2.x].sort((a,b) => a - b)
    const emptyRowsBetween = emptyRows.filter(v => v > yMin && v < yMax).length;
    const emptyColsBetween = emptyCols.filter(v => v > xMin && v < xMax).length;
    const distanceY = yMax - yMin + (emptyRowsBetween * (expansion - 1));
    const distanceX = xMax - xMin + (emptyColsBetween * (expansion - 1));
    return distanceY + distanceX;
}