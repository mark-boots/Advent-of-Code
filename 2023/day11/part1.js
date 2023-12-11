import loadLines from '../../LoadLines.js'

const lines = loadLines('example.txt').map(line => line.split(""));
const space = addEmpties(addEmpties(lines, 'row'),'column');
const galaxies = findPositions(space, "#");
const galaxyPairs = getPairs(galaxies);
const part1 = galaxyPairs.reduce((sum, pair) => sum + getDistance(pair), 0);
console.log(part1);


// helpers
function getPairs (arr) {
    return arr.flatMap((v1, i1) => 
        arr.flatMap((v2, i2) => 
            (i1 > i2) ? [[v1,v2]] : []
        )
    ) 
}
function getDistance([p1, p2]){
    return Math.abs(p1.y - p2.y) + Math.abs(p1.x - p2.x);
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
function addEmpties(arr, dir=row){
    let temp = [];
    if(dir == 'column') arr = rotateArray(arr, 1);
    while(arr.length){
        const row = arr.shift();
        if(row.every(ch => ch === '.')) temp.push(row);
        temp.push(row);
    }
    if(dir == 'column') temp = rotateArray(temp, -1);
    return temp; 
}
function rotateArray(a,d=1){
    if(d== 1) return a[0].map((_, i)=>a.map(r=>r[i]).reverse())
    if(d==-1) return a[0].map((_, i)=>a.map(r=>r[r.length-1-i]))
}