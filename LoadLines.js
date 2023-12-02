import fs from 'fs';

export default function loadLines(fileName){
    const lines = fs.readFileSync(fileName, 'utf8').split('\r\n');
    return lines;  
}