import loadLines from '../../LoadLines.js';

const mirrors = loadLines("input.txt").reduce((a,l) => (l.length == 0 ? a.push([]) : a[a.length - 1].push(l), a), [[]])
// const lines = loadLines("input.txt");

let part1 = mirrors.reduce((sum, mirror) => {
    let reflectCol = 0;
    for(let colIdx = 1; colIdx < mirror[0].length - 1; colIdx++){
        if(mirror.every(row => row.split("").reverse().join("").startsWith(row.substring(colIdx))))
        {
            reflectCol = (mirror[0].length - colIdx) / 2 + 1
            break;
        }
    }

    let reflectRow = 0;
    for(let rowIdx = 1; rowIdx < mirror.length - 1; rowIdx++){
        if(mirror.slice(rowIdx).every((row, rowIdx)=> row == mirror.at(-rowIdx)))
        {
            console.log(rowIdx)
            reflectRow = (mirror.length - rowIdx) / 2 + 1;
            break;
        }
    }
    console.table(mirror);
    console.log({reflectCol, reflectRow})
    return sum += reflectCol + reflectRow * 100;
}, 0)

console.log(part1)