import fs from 'fs';

export default function loadLines(fileName){
    const lines = fs.readFileSync(fileName, 'utf8').split('\n').map(e => e.trim());
    return lines;  
}