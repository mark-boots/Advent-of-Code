import loadLines from '../../LoadLines.js';

const space = loadLines('input.txt').map(line => line.split(""));
const galaxies = [];
const emptyRows = [];
const emptyCols = [];
const pairDistances = [];

for(let y = 0, max = Math.max(space.length, space[0].length); y < max; y++){
    let emptyRow = true;
    let emptyCol = true;
    for(let x = 0; x < max; x++){
        //empty rows, galaxies and pairDistances;
        if (x < space[0].length && space[y][x] == '#'){
            emptyRow = false;
            galaxies.push({y,x});
            if(galaxies.length > 1) {     
                for(let i = 0; i < galaxies.length -1; i++){
                    const [yMin, yMax] = [galaxies[i].y, y].sort((a,b)=>a-b);
                    const [xMin, xMax] = [galaxies[i].x, x].sort((a,b)=>a-b);
                    const dist = (yMax - yMin) + (xMax - xMin);
                    pairDistances.push({yMin, yMax, xMin, xMax, dist});                    
                }
            }
        }
        //empty cols; (swap x y index);
        if(y < space.length && space[x][y] !=='.') emptyCol = false;
    }
    if(emptyCol) emptyCols.push(y);
    if(emptyRow) emptyRows.push(y);    
}

console.log({
    part1: cosmicExpansion(2),       //9693756
    part2: cosmicExpansion(1000000), //717878258016
})

function cosmicExpansion(factor){
    return pairDistances.reduce((sum, distance) => sum + expandEmptySpace(distance, factor), 0);
}
function expandEmptySpace({yMin, yMax, xMin, xMax, dist}, factor){
    const er = emptyRows.filter(v => v > yMin && v < yMax).length * (factor - 1);
    const ec = emptyCols.filter(v => v > xMin && v < xMax).length * (factor - 1);
    return dist + er + ec;
}