import loadLines from '../../LoadLines.js';

const space = loadLines('input.txt').map(line => line.split(""));
const galaxies = findPositions(space, "#");
const galaxyPairs = getPairs(galaxies);
const emptyRows = getEmptyRows(space);
const emptyCols = getEmptyCols(space);

console.log({
    part1: cosmicExpansion(2),       // 8975866
    part2: cosmicExpansion(1000000), // 7178258016
})

function cosmicExpansion(expansion){
    return galaxyPairs.reduce((sum, pair) => sum + getDistance(pair, expansion), 0);
}
function getDistance([p1,p2], expansion){
    const [yMin, yMax] = [p1.y, p2.y].sort((a,b) => a - b)
    const [xMin, xMax] = [p1.x, p2.x].sort((a,b) => a - b)
    const emptyRowsInRange = emptyRows.filter(v => v > yMin && v < yMax).length;
    const emptyColsInRange = emptyCols.filter(v => v > xMin && v < xMax).length;
    const distanceY = yMax - yMin - emptyRowsInRange + (emptyRowsInRange * expansion);
    const distanceX = xMax - xMin - emptyColsInRange + (emptyColsInRange * expansion);
    return distanceY + distanceX;
}
function getEmptyRows(arr){
    const temp = [];
    for(let y = 0; y < arr.length; y++){
        if(arr[y].every(v => v==='.')) temp.push(y);
    }
    return temp;
}
function getEmptyCols(arr){
    const temp = [];
    for(let x = 0; x < arr[0].length; x++){
        let empty = true;
        for(let y = 0; y < arr.length; y++){
            if(arr[y][x] !== '.') {
                empty = false;
                break;
            }
        }
        if(empty) temp.push(x)
    }
    return temp;
}
function getPairs (arr) {
    return arr.flatMap((v1, i1) => {
        return arr.flatMap((v2, i2) => { 
            return (i1 > i2) ? [[v1,v2]] : []
        })
    })
}
function findPositions(arr, find){
    const temp = [];
    for(let y = 0; y < arr.length; y++){
        for(let x = 0; x < arr[y].length; x++){
            if (arr[y][x] == find) temp.push({y,x})
        }
    }
    return temp;
}